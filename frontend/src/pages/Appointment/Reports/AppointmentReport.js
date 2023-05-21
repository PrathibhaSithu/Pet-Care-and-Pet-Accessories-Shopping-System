import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import reportHeader from '../../../assets/reportHeader.png';
import styled from "@emotion/styled";
import { HiOutlineDocumentReport } from 'react-icons/hi';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #9980FA;
  border: none;
  padding: 6px 5px;
  background-color: transparent;
  cursor: pointer;

  &:hover{
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px 0 0;
  vertical-align: middle; /* adjust the vertical alignment of the icon */
`;

const AppointmentReport = ({data}) => {

    const downloadPDF = () => {
        const doc = new jsPDF();

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${day}-${month}-${year}`;
        console.log(formattedDate);
        
        // Add the logo image to the document
        const logoWidth = 180;
        const logoHeight = 25;
        const pageWidth = doc.internal.pageSize.getWidth();
        const logoX = (pageWidth - logoWidth) / 2;
        doc.addImage(reportHeader, "PNG", logoX, 10, logoWidth, logoHeight); // (image, type, x, y, width, height)

        // Add custom text next to the report name
        doc.setFont("helvetica", "bold");
        doc.setFontSize(28);

        //Change report name accordingly
        doc.text("Appointments Report", (pageWidth / 2), 60, { align: "center" });
        // Underline the text
        const textWidth = doc.getStringUnitWidth("Appointments Report") * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.setLineWidth(0.5);
        doc.line((pageWidth / 2) - (textWidth / 2), 63, (pageWidth / 2) + (textWidth / 2), 63);

        doc.setFont("arial", "normal");
        doc.setFontSize(12);
        doc.text("Date: " + formattedDate, 195, 75, { align: "right" });
      
        // Add the table to the document
        doc.autoTable({
          head: [["Appointment ID", "Pet Owner Name", "Pet Name", "Pet Species", "Pet Gender", "Date", "Reason", "Status"]],
          body: data.map((appointment) => {
            return [appointment.appointmentId, appointment.ownerName, appointment.petName, appointment.petSpecies, appointment.petGender, appointment.date, appointment.reason, appointment.status];
          }),
          startY: 80, // start the table below the logo
          headStyles: {
            fillColor: '#9980FA',
            fontSize: 12,
            textColor: 255,
            halign: 'center'
          },
          bodyStyles: {
            halign: 'center',
            fontSize: 11,
          },
        //   columnStyles: {
        //     // 0: { halign: 'center' }, //we have set center as default
        //     1: { halign: 'left' }, // left align the content in second column
        //   },
        });
    
        doc.save("appointments.pdf"); //Change name accordingly
      };

  return (
    <Button onClick={downloadPDF}>
      <IconWrapper>
        <HiOutlineDocumentReport size="1rem"/>
      </IconWrapper>
      REPORT
    </Button>
  );
};

export default AppointmentReport;
