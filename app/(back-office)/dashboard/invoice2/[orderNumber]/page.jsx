"use client"
import SalesInvoice from "@/components/backoffice/SalesInvoice";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getData } from "@/lib/getData";

export default async function Page({ params: { orderNumber } }) {
  const invoiceRef = useRef(null);

  const orders = await getData("orders");
  const order = orders.find(order => order.orderNumber === orderNumber);

  const handleDownload = async () => {
    const canvas = await html2canvas(invoiceRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save(`${order.orderNumber}_invoice.pdf`);
  };

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-end justify-end">
        <button
          type="button"
          className="inline-flex items-center justify-center px-4 py-3 text-xs font-bold text-gray-900 transition-all duration-200 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-200"
          onClick={handleDownload}
        >
          Download Invoice
        </button>
      </div>
      <SalesInvoice ref={invoiceRef} order={order} />
    </div>
  );
}
