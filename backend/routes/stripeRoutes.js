const express = require("express");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { protect } = require("../middleware/authMiddleware");

router.post('/create-checkout-session', async (req, res) => {

    const line_items = req.body.cartItems.map((item) => {
        return {
            price_data: {
                currency: 'lkr',
                product_data: {
                    name: item.product.productName,
                images: [item.product.image],
                metadata: {
                    id: item.product._id
                }
                },
                unit_amount: item.product.price * 100,
            },
            quantity: item.cartQuantity,
        }
    })

    const email = ''

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {allowed_countries: ['LK']},
        shipping_options: [
            {
            shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {amount: 60000, currency: 'lkr'},
                display_name: 'Standard shipping',
                delivery_estimate: {
                minimum: {unit: 'business_day', value: 3},
                maximum: {unit: 'business_day', value: 5},
                },
            },
            },
            {
            shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {amount: 100000, currency: 'lkr'},
                display_name: 'Express shipping',
                delivery_estimate: {
                minimum: {unit: 'business_day', value: 1},
                maximum: {unit: 'business_day', value: 2},
                },
            },
            },
        ],
        phone_number_collection: {
            enabled: true
        },
        customer_email: email ? email : undefined, // Include email only if it is not an empty string
        line_items,
        mode: 'payment',
        success_url: `${process.env.SERVER_URL}/api/checkout/create-order?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
        expand: ['line_items'],
        metadata: {
            user: ''
        }
    });

    // send the session id to the client
    res.send({ url: session.url });

});

//for logged in users
router.post('/create-checkout-session-logged-in', protect, async (req, res) => {

    const line_items = req.body.cartItems.map((item) => {
        return {
            price_data: {
                currency: 'lkr',
                product_data: {
                    name: item.product.productName,
                images: [item.product.image],
                metadata: {
                    id: item.product._id
                }
                },
                unit_amount: item.product.price * 100,
            },
            quantity: item.cartQuantity,
        }
    })

    const email = req.user.email
    const userId = req.user._id.toString();

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {allowed_countries: ['LK']},
        shipping_options: [
            {
            shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {amount: 60000, currency: 'lkr'},
                display_name: 'Standard shipping',
                delivery_estimate: {
                minimum: {unit: 'business_day', value: 3},
                maximum: {unit: 'business_day', value: 5},
                },
            },
            },
            {
            shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {amount: 100000, currency: 'lkr'},
                display_name: 'Express shipping',
                delivery_estimate: {
                minimum: {unit: 'business_day', value: 1},
                maximum: {unit: 'business_day', value: 2},
                },
            },
            },
        ],
        phone_number_collection: {
            enabled: true
        },
        customer_email: email ? email : undefined, // Include email only if it is not an empty string
        line_items,
        mode: 'payment',
        success_url: `${process.env.SERVER_URL}/api/checkout/create-order?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
        expand: ['line_items'],
        metadata: {
            user: userId
        }
    });

    // send the session id to the client
    res.send({ url: session.url });

});


router.get("/create-order", async (req, res) => {

   const { session_id } = req.query;

   try {
        // Retrieve the session object
        const session = await stripe.checkout.sessions.retrieve(
            session_id,
            { expand: ['line_items.data.price.product'] }
        );

        const lineItems = session.line_items.data;

        const orderItems = lineItems.map(lineItem => {
            return {
                productId: lineItem.price.product.metadata.id,
                productName: lineItem.description,
                image: lineItem.price.product.images[0],
                unitPrice: lineItem.price.unit_amount / 100,
                quantity: lineItem.quantity,
                productTotal: (lineItem.quantity * lineItem.price.unit_amount) / 100
            }
        });

        const shipping = { name: session.shipping_details.name, address: session.shipping_details.address, phone: session.customer_details.phone }

        const subTotal = session.amount_subtotal / 100;
        const shippingAmount = session.total_details.amount_shipping / 100;
        const total = session.amount_total / 100;

        const user = session.metadata.user;

        // Retrieve the payment intent object
        const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);


        if (paymentIntent.status === 'succeeded') {
            
            // Create a new order
            const newOrder = new Order({
                ...(user && { user }), // Include the user field only if a user object is available
                orderItems,
                shipping,
                subTotal,
                shippingAmount,
                total,
                paymentStatus: paymentIntent.status
            });
            
            await newOrder.save()

            // Update product quantity
            for (let i = 0; i < orderItems.length; i++) {
                const productId = orderItems[i].productId;
                const quantity = orderItems[i].quantity;
                await Product.findByIdAndUpdate(productId, { $inc: { quantity: -quantity } });
            }

            res.redirect(`${process.env.CLIENT_URL}/success`);
        }

   } catch (err) {
        console.log(err)
        res.redirect(`${process.env.CLIENT_URL}/cart`)
   }

});

module.exports = router;