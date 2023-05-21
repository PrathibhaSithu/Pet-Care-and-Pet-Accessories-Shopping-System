import React from "react";
import "./Home-page.scss";
// picture importings
import HeroImage from "../../assets/imgs/hero-sec-image/hero-image.jpg";
import logo from "../../assets/imgs/hero-sec-image/logo-v2.png";
import homeImg2 from "../../assets/imgs/hero-sec-image/row-1-pic.jpg";
import ServiceBack from "../../assets/imgs/hero-sec-image/services.png";
import LastPic from "../../assets/imgs/hero-sec-image/last-pic.jpg";
import Footer from "../../components/footer/footer"
// component importings
import HeaderAdvanced from "../../components/headerAdvanced/HeaderAdvanced";
import HeaderTransparent from "../../components/headerAdvanced/HeaderTransparent";
import FooterStore from "../../components/store/Footer";
import { useNavigate } from "react-router-dom";
function HomePage() {

	const navigate = useNavigate()
	return (
		<div className="home-page-container">
			{/* hero section */}
			<div className="hero-picture">
				{/* <HeaderAdvanced /> */}
				<HeaderTransparent />
				<img src={HeroImage} alt="" className="hero-sec-image" />
				<div className="hero-overlay"></div>
				<div className="welcome-container">
					<div className="text-container">
						<div className="welcome-text">
							Care for your <br /> friend{" "}
						</div>
						<div className="welcome-text-body">
							We are dedicated to provide <br />
							excellent care.
							<br />
							Call today to schedule an appointment
						</div>
						<div className="welcome-sec-button">
							<button className="schedule-appt-btn" onClick={()=>{
								navigate("/makeAppointment")
							}}>
								schedule appointment
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* body section */}
			<div className="first-section-home">
				<div className="company-message">
					<div className="text-section">
						<img src={logo} alt="" className="watermark-logo" />
						<div className="message">
							<span className="message-topic">
								Your pet is your family
							</span>
							<span className="message-body">
								We love to watch your pets grow up, and we'll work as
								hard as you do to keep them happy and healthy 
								throughout their entire lives. That's why many of our
								clients consider us Denver's best vet for pet lovers!

								We provide a full range of premium preventative care,
								diagnostic and treatment services, with a highly skilled
								staff that works hand-in-hand with you to ensure your
								pets recieve the best possible care.
							</span>
						</div>
					</div>
					<img src={homeImg2} alt="" className="image-section" />
					<div className="color-column"></div>
				</div>
			</div>

			{/* discount row */}
			<div className="discount-container">
				<span className="discount">
					20% discount on every friday to any treatment.
				</span>
			</div>

			<div className="our-message">
				<div className="topic-container">
					<span className="topic">Who we are</span>
					<span className="line"></span>
				</div>

				<span className="our-message-text">
					We are wellness clinic devoted to offering reduced cost services to cats and dogs. These include vaccinations, deworming, health certificates, microhipping,
					heartworm testing, leukemia/FIV testing, ass well as  offering flea/tick/heartworm prevention products.
					We also will trat minor skin and ear infections, perform anal gland expression, and do nail trims. Your visit also includes a full examination, which is often not included
					ar other low cost clinics. We also offer reduced cost spay/neuter services and other surgical producures. Call us and ask if you have questions about additions services.
				</span>
			</div>

			{/* services section */}
			<div className="service-container">
				<img src={ServiceBack} className="service-background" />
				<div className="service-overlay"></div>
			</div>

			{/* last card */}
			<div className="company-message">
				<div className="color-column"></div>
				<img src={LastPic} alt="" className="image-section" />
				<div className="text-section-last">
					<img src={logo} alt="" className="watermark-logo-last" />
					<div className="message">
						<span className="message-topic">
							Your pet is your family
						</span>
						<span className="message-body">
						At Pets Care, we understand and share your feelings 
						about your pet being a treasured and beloved member 
						of your family. Our expertise and professional 
						experience enables us to deliver the utmost care to your 
						pet with kindness, respect and love.  
						During our 20+ years of experience in the veterinary 
						field, we have handled everything from routine
					    checkups, general health concerns and in-office 
						treatments.
						</span>
					</div>
				</div>
			</div>

			{/* make inquiry form */}
			<div className="inquiry-form-container">
				<div className="left-side"></div>
				<div className="right-side"></div>
			</div>

			{/* footer section */}
			<FooterStore/>
		</div>
	);
}

export default HomePage;
