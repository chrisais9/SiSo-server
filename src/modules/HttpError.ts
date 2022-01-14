import { StatusCodes } from "http-status-codes";

Error.stackTraceLimit = 20;

export interface HttpError extends Error {
	status: StatusCodes | number;
	devMessage: string;
}

export enum SentenceKey {
	UNKNOWN_ERROR = "UNKNOWN_ERROR", // 알 수 없는 에러
	NOT_FOUND = "NOT_FOUND", // 없는 페이지

	BAD_REQUEST = "BAD_REQUEST", // 잘못된 요청

	BAD_DATA = "BAD_DATA", // 잘못된 데이터
	BAD_ID = "BAD_ID", // 잘못된 _id

	NO_DATA = "NO_DATA", // 누락된 데이터
	NO_ID = "NO_ID", // 누락된 _id
	NO_PERMISSION = "NO_PERMISSION", // 누락된 권한

	BAN_WORD = "BAN_WORD", // 금지어 (리뷰)
	BAN_WORD_REVIEW = "BAN_WORD_REVIEW", // 금지어 (리뷰)
	BAN_WORD_NICKNAME = "BAN_WORD_NICKNAME", // 금지어 (닉네임)

	QUICK_REQUEST = "QUICK_REQUEST", // 너무 빠른 요청

	// User & /auth
	UNAUTHORIZED = "UNAUTHORIZED",
	ALREADY_REGISTERED = "ALREADY_REGISTERED", // 이미 있는 회원
	NO_REGISTERED = "NO_REGISTERED", // 없는 회원
	EXPIRED_TOKEN = "EXPIRED_TOKEN", // 만료된 토큰
	BAD_FCM_TOKEN = "BAD_FCM_TOKEN", // 잘못된 FCM 토큰
	BAD_TOKEN = "BAD_TOKEN", // 잘못된 토큰
	BAD_LOGIN_TYPE = "BAD_LOGIN_TYPE", // 잘못된 로그인 타입
	DUPLICATED_NAME = "DUPLICATED_NAME", // 중복된 닉네임

	// /charge
	NOT_ENOUGH_GEM = "NOT_ENOUGH_GEM", // gem 부족
	NOT_ENOUGH_CANDY = "NOT_ENOUGH_CANDY", // candy 부족
	COMPLETED_ATTENDANCE = "COMPLETED_ATTENDANCE", // 완료된 출석

	// /recommend
	BAD_INVITE_CODE = "BAD_INVITE_CODE", // 잘못된 추천코드
	ALREADY_INVITED = "ALREADY_INVITED", // 이미 추천기회 사용
	SELF_INVITED = "SELF_INVITED", // 자기 자신 추천
	INVITE_FCM_TITLE = "INVITE_FCM_TITLE", // 초대코드를 입력당했을 시
	INVITE_FCM_BODY = "INVITE_FCM_BODY", // 초대코드를 입력당했을 시

	// /theme
	ALREADY_BUY = "ALREADY_BUY", // 이미 구입한 테마
	BUY_HIDE_THEME = "BUY_HIDE_THEME", // 판매가 종료된 테마
	NOT_BUY = "NOT_BUY", // 구입하지 않은 테마
	ALREADY_REVIEW = "ALREADY_REVIEW", // 이미 리뷰
	ALREADY_REVIEW_REPORT = "ALREADY_REVIEW_REPORT", // 이미 신고
}

export function createHttpError(status: StatusCodes | number, message: string | SentenceKey, devMessage?: string): HttpError {
	// HttpError 생성
	let httpError: HttpError = <HttpError>new Error(message);

	httpError.status = status;
	httpError.devMessage = devMessage;

	// 이 함수에서 에러를 생성하는 로직을 에러 스택에서 제거
	Error.captureStackTrace(httpError, createHttpError);

	return httpError;
}
