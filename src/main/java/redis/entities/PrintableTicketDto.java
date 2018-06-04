package redis.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * 
 * @Title: PrintableTicketDto.java
 * @Description: 旅客电子发票客票列表信息--查询结果
 * @Company: pactera
 * @Author: hongjun.quan@pactera.com
 * @CreateDate: 2017年4月18日 上午10:52:53 
 * @UpdateUser: hongjun.quan@pactera.com
 * @Version: V1.0
 */
public class PrintableTicketDto implements Serializable{
	
	private static final long serialVersionUID = 4745711396867585436L;
	
	private String ticketNo;		//客票号
	private String psgName;			//旅客姓名
	private String certificateId;	//证件号
	private String certificateType;	//证件类型
	private String businessType;	//商品类型
	private String ticketType;		//客票类型
	private List<PrintableTicketCouopn> printableTicketcouopnList = new ArrayList<PrintableTicketCouopn>();	//票联列表
	private String amount;			//金额
	private String invoiceStatus;	//打印状态：Y：已打印行程单 E：已打印电子发票 D:正在打印电子发票 N：未打印
	private String displayUrl;		//打印URL
	private String message;  		//开具失败原因

	public String getTicketNo() {
		return ticketNo;
	}
	public void setTicketNo(String ticketNo) {
		this.ticketNo = ticketNo;
	}
	public String getPsgName() {
		return psgName;
	}
	public void setPsgName(String psgName) {
		this.psgName = psgName;
	}
	public String getCertificateId() {
		return certificateId;
	}
	public void setCertificateId(String certificateId) {
		this.certificateId = certificateId;
	}
	public String getCertificateType() {
		return certificateType;
	}
	public void setCertificateType(String certificateType) {
		this.certificateType = certificateType;
	}
	public String getBusinessType() {
		return businessType;
	}
	public void setBusinessType(String businessType) {
		this.businessType = businessType;
	}
	public String getTicketType() {
		return ticketType;
	}
	public void setTicketType(String ticketType) {
		this.ticketType = ticketType;
	}
	public List<PrintableTicketCouopn> getPrintableTicketcouopnList() {
		return printableTicketcouopnList;
	}
	public void setPrintableTicketcouopnList(List<PrintableTicketCouopn> printableTicketcouopnList) {
		this.printableTicketcouopnList = printableTicketcouopnList;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getInvoiceStatus() {
		return invoiceStatus;
	}
	public void setInvoiceStatus(String invoiceStatus) {
		this.invoiceStatus = invoiceStatus;
	}
	public String getDisplayUrl() {
		return displayUrl;
	}
	public void setDisplayUrl(String displayUrl) {
		this.displayUrl = displayUrl;
	}
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
