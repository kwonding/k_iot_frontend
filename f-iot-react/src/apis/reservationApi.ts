// : 예약 관련 API 호출 메서드 작성 (비동기 함수)

import { publicApi } from "./axiosInstance"

export interface ReservationDto {
  id: number;             // 예약 고유 PK 값
  truckId: number;        // 가게(truck) 고유 PK 값 (FK)
  userId: number;         // 사용자 고유 PK 값 (FK)
  date: string;           // "2025-11-12"
  timeSlot: string;       // "10:40-11:40"
  status: string;         // "CONFIRMED" | "CANCELLED"
}

export const getAllReservations = async (truckId: number): Promise<ReservationDto[]> => {
  try {
    const res = await publicApi.get(`/trucks/${truckId}/reservations`);
    return res.data.data as ReservationDto[]; // - Promise resolve
  } catch(e) {
    console.error("getAllReservations error: ", e);
    return []; // Promise reject
  }
}

export const getReservation = async (truckId: number, reservationId: number): Promise<ReservationDto | null> => {
  try {
    const res = await publicApi.get(`/trucks/${truckId}/reservations/${reservationId}`);
    return res.data.data as ReservationDto;
  } catch(e) {
    console.error("getReservation error: ", e);
    return null;
  }
}