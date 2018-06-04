package redis.entities;

import java.io.Serializable;

/**
 * 
 * @Title: PrintableTicketCouopn.java
 * @Description: 旅客票联信息--查询结果
 * @Company: pactera
 * @Author: hongjun.quan@pactera.com
 * @CreateDate: 2017年4月18日 上午11:09:30 
 * @UpdateUser: hongjun.quan@pactera.com
 * @Version: V1.0
 */
public class PrintableTicketCouopn implements Serializable{
	
	private static final long serialVersionUID = -4815764971165127599L;
	
	private Integer couponNumber;	//票联号:1-4
	private String ticketNo;		//
	private String status;			//票联状态
	private String flightDate;		//航班日期
	private String originAirport;		//起飞机场
	private String destinationAirport;	//到达机场
	private String departureTime;		//起飞时间:hhmm
	private String arrivalTime;			//到达时间:hhmm
	
	public Integer getCouponNumber() {
		return couponNumber;
	}
	public void setCouponNumber(Integer couponNumber) {
		this.couponNumber = couponNumber;
	}
	public String getTicketNo() {
		return ticketNo;
	}
	public void setTicketNo(String ticketNo) {
		this.ticketNo = ticketNo;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getFlightDate() {
		return flightDate;
	}
	public void setFlightDate(String flightDate) {
		this.flightDate = flightDate;
	}
	public String getOriginAirport() {
		return originAirport;
	}
	public void setOriginAirport(String originAirport) {
		this.originAirport = originAirport;
	}
	public String getDestinationAirport() {
		return destinationAirport;
	}
	public void setDestinationAirport(String destinationAirport) {
		this.destinationAirport = destinationAirport;
	}
	public String getDepartureTime() {
		return departureTime;
	}
	public void setDepartureTime(String departureTime) {
		this.departureTime = departureTime;
	}
	public String getArrivalTime() {
		return arrivalTime;
	}
	public void setArrivalTime(String arrivalTime) {
		this.arrivalTime = arrivalTime;
	}
}
