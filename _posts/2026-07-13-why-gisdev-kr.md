---
title: "gisdev-kr을 시작하며: 얇게 만들고 오래 연결하기"
description: 거대한 코드를 복사하는 대신 upstream과 지역 레이어를 분리한 이유를 기록합니다.
categories: [프로젝트, 운영]
tags: [gisdev-kr, 오픈소스, architecture]
---

지리정보 프로젝트를 시작할 때 가장 쉬운 선택은 기존 저장소를 통째로 복사하는 것입니다. 첫날에는 빠르지만, 시간이 지나면 원 프로젝트의 개선을 받기 어려워집니다. gisdev-kr은 그 반대 방향에서 시작합니다.

## 원 프로젝트를 중심에 둡니다

공통 수집 코드와 데이터 모델은 가능한 한 upstream을 그대로 사용합니다. 한국에만 필요한 실행 목록, 검증, 월간 빌드, 지도 화면은 별도의 얇은 저장소에 둡니다.

```text
alltheplaces upstream
        │ pinned submodule
        ▼
alltheplaces-kr overlay
  ├─ Korea allowlist
  ├─ monthly exports
  └─ static MapLibre portal
```

이 구조에서는 upstream 커밋을 명시적으로 올리는 순간이 곧 업데이트입니다. 문제가 생기면 어떤 버전에서 달라졌는지도 추적할 수 있습니다.

## 자동화와 자동 반영은 다릅니다

수집과 변환은 자동화하되 OpenStreetMap 수정은 자동으로 수행하지 않습니다. 후보는 거리와 이름 유사도 같은 근거와 함께 정리하고, 실제 반영은 검토 후 수동으로 진행합니다.

## 다음 기록

첫 프로젝트인 All the Places KR의 spider 선정 기준과 GitHub Actions 월간 빌드를 차례로 정리할 예정입니다.

