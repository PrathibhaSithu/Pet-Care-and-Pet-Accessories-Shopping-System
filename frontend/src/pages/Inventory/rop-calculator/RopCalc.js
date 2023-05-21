import React , {useState} from 'react'
import './RopCalc.scss'
import AdminLayout from '../../Layouts/AdminLayout'


function RopCalc() {
  
    const[calcData , setCaclcData] = useState({
        averageDemand:0,
        leadTime: 0,
        safetyStock:0,
        rop:""
    }) 
    const [rop , setRop] = useState(0)

    const handleCalcSubmit = (e) => {
        e.preventDefault()
        const val = (parseInt(calcData.averageDemand) * parseInt(calcData.leadTime)) + parseInt(calcData.safetyStock)
        setRop(val)
        setCaclcData({
            averageDemand:0,
            leadTime: 0,
            safetyStock:0,
            rop:""
        })
    }

    const handleCalcInput = (e) => {
        setCaclcData({...calcData , [e.target.name]:e.target.value})
    }

  return (
    <AdminLayout>
        <div className="rop-calculator-container-main">
            <div className="container">
                 <span className="rop-calc-headline">Reorder Point Calculator</span>
                <form onSubmit={handleCalcSubmit}>
                    <section className="input-container">
						<span className="input-title">Average Demand</span>
						<input
							className="input-field-calc-rop"
							value={calcData.averageDemand}
							name="averageDemand"
							onChange={handleCalcInput}
						/>
					</section>
                    <section className="input-container">
						<span className="input-title">Lead Time</span>
						<input
							className="input-field-calc-rop"
							value={calcData.leadTime}
							name="leadTime"
							onChange={handleCalcInput}
						/>
					</section>
                    <section className="input-container">
						<span className="input-title">Safety Stock</span>
						<input
							className="input-field-calc-rop"
							value={calcData.safetyStock}
							name="safetyStock"
							onChange={handleCalcInput}
						/>
					</section>
                    <div className="btn-container-rop-calc">
                        <button type='submit' className='rop-calc-btn'>Calculate</button>
                    </div>
                </form>

                <span className='rop-calc-final-val-displayer'>Reorder Point(ROP) is {rop}</span>

                {/* <div className="rop-calc-user-guide">
                    <div className="cal-heads-container">
                        <span className='calc-head'>Average Demand:</span>
                        <span className='calc-head'>Lead Time:</span>
                        <span className='calc-head'>Safety Stock:</span>
                    </div>
                    <div className="cal-guide-tips">
                        <span className='calc-tips'>Average number of units sold or consumed per day</span>
                        <span className='calc-tips'>Time takes for an order to be delivered after it has been placed</span>
                        <span className='calc-tips'>Additional buffer stock kept to mitigate uncertainties in demand or supply.</span>
                    </div>
                </div> */}
            </div>
        </div>
    </AdminLayout>
  )
}

export default RopCalc
