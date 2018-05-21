package mongodb.boot.entity;

import java.io.Serializable;
import java.util.Date;

public class InvoiceMsgSend implements Serializable{
	
	private static final long serialVersionUID = -8854828512380970138L;

//	private Integer id;
	
	private String ticketType;
	
	private String businessType;
	
	private String workType;
	
	private String phone;
	
	private String email;
	
	private String ticketNo;
	
	private String serviceNo;
	
	private String psgName;
	
	private String idCard;
	
	private String idType;
	
	private String ffpCardNo;
	
	private String invoiceCode;
	
	private String invoiceNo;
	
	private String checkCode;
	
	private String invoiceDate;
	
	private String pdfUrl;
	
	private String sendStatus;
	
	private Date creationTime;
	
	private Date updateTime;

	private Date semdTime;
	
	private String workLanguage;
	
	private String channel;
	
	private String remark;

	private String contents1;

	private String contents2;

	private String contents3;

	private String amount;

	private String fail_msg;

//	public Integer getId() {
//		return id;
//	}
//
//	public InvoiceMsgSend setId(Integer id) {
//		this.id = id;
//		return this;
//	}

	public String getTicketType() {
		return ticketType;
	}

	public InvoiceMsgSend setTicketType(String ticketType) {
		this.ticketType = ticketType;
		return this;
	}

	public String getBusinessType() {
		return businessType;
	}

	public InvoiceMsgSend setBusinessType(String businessType) {
		this.businessType = businessType;
		return this;
	}

	public String getWorkType() {
		return workType;
	}

	public InvoiceMsgSend setWorkType(String workType) {
		this.workType = workType;
		return this;
	}

	public String getPhone() {
		return phone;
	}

	public InvoiceMsgSend setPhone(String phone) {
		this.phone = phone;
		return this;
	}

	public String getEmail() {
		return email;
	}

	public InvoiceMsgSend setEmail(String email) {
		this.email = email;
		return this;
	}

	public String getTicketNo() {
		return ticketNo;
	}

	public InvoiceMsgSend setTicketNo(String ticketNo) {
		this.ticketNo = ticketNo;
		return this;
	}

	public String getServiceNo() {
		return serviceNo;
	}

	public InvoiceMsgSend setServiceNo(String serviceNo) {
		this.serviceNo = serviceNo;
		return this;
	}

	public String getPsgName() {
		return psgName;
	}

	public InvoiceMsgSend setPsgName(String psgName) {
		this.psgName = psgName;
		return this;
	}

	public String getIdCard() {
		return idCard;
	}

	public InvoiceMsgSend setIdCard(String idCard) {
		this.idCard = idCard;
		return this;
	}

	public String getIdType() {
		return idType;
	}

	public InvoiceMsgSend setIdType(String idType) {
		this.idType = idType;
		return this;
	}

	public String getFfpCardNo() {
		return ffpCardNo;
	}

	public InvoiceMsgSend setFfpCardNo(String ffpCardNo) {
		this.ffpCardNo = ffpCardNo;
		return this;
	}

	public String getInvoiceCode() {
		return invoiceCode;
	}

	public InvoiceMsgSend setInvoiceCode(String invoiceCode) {
		this.invoiceCode = invoiceCode;
		return this;
	}

	public String getInvoiceNo() {
		return invoiceNo;
	}

	public InvoiceMsgSend setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
		return this;
	}

	public String getCheckCode() {
		return checkCode;
	}

	public InvoiceMsgSend setCheckCode(String checkCode) {
		this.checkCode = checkCode;
		return this;
	}

	public String getInvoiceDate() {
		return invoiceDate;
	}

	public InvoiceMsgSend setInvoiceDate(String invoiceDate) {
		this.invoiceDate = invoiceDate;
		return this;
	}

	public String getPdfUrl() {
		return pdfUrl;
	}

	public InvoiceMsgSend setPdfUrl(String pdfUrl) {
		this.pdfUrl = pdfUrl;
		return this;
	}

	public String getSendStatus() {
		return sendStatus;
	}

	public InvoiceMsgSend setSendStatus(String sendStatus) {
		this.sendStatus = sendStatus;
		return this;
	}

	public Date getCreationTime() {
		return creationTime;
	}

	public InvoiceMsgSend setCreationTime(Date creationTime) {
		this.creationTime = creationTime;
		return this;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public InvoiceMsgSend setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
		return this;
	}

	public Date getSemdTime() {
		return semdTime;
	}

	public InvoiceMsgSend setSemdTime(Date semdTime) {
		this.semdTime = semdTime;
		return this;
	}

	public String getWorkLanguage() {
		return workLanguage;
	}

	public InvoiceMsgSend setWorkLanguage(String workLanguage) {
		this.workLanguage = workLanguage;
		return this;
	}

	public String getChannel() {
		return channel;
	}

	public InvoiceMsgSend setChannel(String channel) {
		this.channel = channel;
		return this;
	}

	public String getRemark() {
		return remark;
	}

	public InvoiceMsgSend setRemark(String remark) {
		this.remark = remark;
		return this;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getContents1() {
		return contents1;
	}

	public InvoiceMsgSend setContents1(String contents1) {
		this.contents1 = contents1;
		return this;
	}

	public String getContents2() {
		return contents2;
	}

	public InvoiceMsgSend setContents2(String contents2) {
		this.contents2 = contents2;
		return this;
	}

	public String getContents3() {
		return contents3;
	}

	public InvoiceMsgSend setContents3(String contents3) {
		this.contents3 = contents3;
		return this;
	}

	public String getAmount() {
		return amount;
	}

	public InvoiceMsgSend setAmount(String amount) {
		this.amount = amount;
		return this;
	}

	public String getFail_msg() {
		return fail_msg;
	}

	public InvoiceMsgSend setFail_msg(String fail_msg) {
		this.fail_msg = fail_msg;
		return this;
	}
}
