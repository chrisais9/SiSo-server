# SiSo-server
'시소'의 API 서버입니다.

## Installing

`npm install`

## Commands

```
deploy - EC2 인스턴스에 배포 (ecosystem.config.js 참조, ssh .pem 키 파일 필요)
build - 빌드
setup - npm dependency 설치 및 빌드
start - 서버 (재)시작
stop - 서버중지
serve - nodemon이 ctrl+s 액션을 감지하면 localhost를 통해 실시간으로 결과 확인 (debug only)
```

## 환경변수
정상적인 실행을 위해서는 환경 변수 설정이 필요합니다. 보안상 Git 상으로 커밋되지 않습니다.

.env
```
PORT= 서버 포트 번호 (3000)
SECRET=jwt 토큰 생성 및 validation 시 사용하는 키값

SLACK_BOT_TOKEN=서버 상태를 알려주는 슬렉 봇 토큰입니다

GOOGLE_CLIENT_ID=구글 클라이언트 아이디, GCP 상에서 발급

MONGO_DB_URI=몽고디비 URI (db user 정보도 함께 포함되어야 함)
```

