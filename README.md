# 김건 / Geon Kim — Research & Product

한국어 개인 포트폴리오. HTML/CSS/JavaScript 기반 GitHub Pages 사이트입니다.

- 공개 사이트: https://geon-geon.github.io/geon-kim-portfolio/
- Attention Compass 데모: https://geon-geon.github.io/geon-kim-portfolio/attention/

## 실행

이 폴더에서 `python -m http.server 4173` 실행 후 http://localhost:4173 을 엽니다. 데모 JSON을 fetch하므로 file://로 직접 열지 마세요. 빌드·패키지·API 키는 필요 없습니다.

## 구성

- `index.html`: 연구, 제품, 금융뉴스, 추가 연구, 경력·학력.
- `styles.css`, `script.js`: 반응형 디자인·섹션 탐색·데모 높이 조절.
- `attention/`: v0.40 실제 결과를 이용한 독립적인 SVG 그래픽 데모.
- `assets/`: 원문 연구 그림 3종, Compass 벡터 지도, 로컬 글꼴과 라이선스.
- `.nojekyll`: GitHub Pages 정적 파일 배포.

## 2026-09-15 디자인 개편

실험실 구축 설명·도면과 오래된 v0.34 화면을 제거했습니다. 첫 화면은 두 개의 실제 작업 비주얼과 간결한 금융연구 링크로 구성합니다. 본문은 번호·제목·방법·결과를 구분하고 Compass 그래픽에는 SVG를 사용합니다.

레퍼런스: [Brittany Chiang](https://brittanychiang.com/)의 간결한 소개와 작업 위계, [Ronald Lopez](https://www.ronglopez.com/projects/ronglopez-portfolio.html)의 타이포그래피와 사례 중심 구성. 원본 디자인·코드·이미지를 복제하지 않았습니다.

## 출처

연구·경력·학력은 사용자가 제공한 Master CV와 전공소개서에 근거합니다. 원본 PDF와 연락처는 배포하지 않습니다.

- `eeg-topography.webp`: 전공소개서 p.4, 낮은·높은 베타 대역 그림. 감마 결과는 본문에 근거.
- `research-pipeline.webp`: 전공소개서 p.3 원문 파이프라인.
- `eye-tracking.webp`: 전공소개서 p.5 초기·후기 처리 지표.
- `compass-map.svg`: v0.40 API 응답의 실제 PCA 좌표·연결·검토 후보에서 생성한 벡터 시각화.
- `portfolio-sans.woff2`: [Pretendard](https://github.com/orioncactus/pretendard) 가변 글꼴의 문자 부분집합. 변경한 글꼴 이름은 Portfolio Sans. SIL Open Font License는 `assets/FONT-LICENSE.txt`.

## Attention Compass의 정확한 범위

엔진 기준: attention-compass 저장소 c8779c4, research-v040. 1,253개 과거 기사, 768차원 임베딩, PCA2 좌표, 11개 영역. PCA 설명분산은 약 12.21%이며 지도 거리는 자산 영향의 크기가 아닙니다.

공개 데모는 가상 자산 EWY/SOXX/USO/IEF와 세 가지 seed 집합 [0,1,2], [3,4,5], [6,7,8]을 엔진에 넣어 계산한 고정 스냅샷입니다. 선택에 따라 상대 관심과 최대 3개 검토 후보가 바뀝니다. 실시간 수집·사용자별 재계산·모델 학습 기능은 없습니다. 실제 사용자 프로필이나 전체 기사 본문은 포함하지 않습니다.

지도 타원은 각 영역 기사 좌표의 분산을 나타내는 시각적 요약입니다. 밝기와 배수는 상대 선택 성향이며 실제 열람률·인지 편향 진단이 아닙니다. 공식 자산 연결 자료도 수집 당시 스냅샷으로, 기사 당시 보유현황이나 가격 영향을 보증하지 않습니다.

기사 출처: [SBHNews / 센서스튜디오](https://www.sbhnews.com/data-use), CC BY 4.0 및 Federal Reserve. 선택·분석·시각화를 수행한 파생물입니다. 실제 투자성과·독립적인 사용자 효용은 검증하지 않았습니다.

## 배포

기존 저장소 main 브랜치 루트의 GitHub Pages 설정을 유지합니다. 커밋 후 push하면 Pages가 배포합니다. 프로젝트 하위 경로에서 동작하도록 상대경로를 사용합니다.
