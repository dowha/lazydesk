-- ============================================================
-- Lazydesk Studio — studio 콘텐츠 테이블
-- Supabase 대시보드 SQL Editor에서 실행하세요.
-- ============================================================

create table if not exists public.studio (
  id               uuid primary key default gen_random_uuid(),

  -- Hero 섹션
  hero_lines       text[]    not null default '{}',
  -- ex) ARRAY['Small, slow,', 'honest app', 'made']
  hero_accent      text,
  -- ex) 'at a lazy desk.'  (주황 이탤릭으로 hero_lines 마지막 줄 뒤에 붙음)
  hero_subtitle    text,
  -- ex) '게으름이 허락된 책상에서 시작된 1인 창작 스튜디오'

  -- About 섹션
  about_body       text[]    not null default '{}',
  -- ex) ARRAY['현대 사회에서 책상은...', '레이지데스크 스튜디오는...', '빠르지 않아도...']
  about_table      jsonb     not null default '[]',
  -- ex) [{"k":"Practice","v":"Product design...","type":"text"},
  --      {"k":"Tools","v":"Figma,React,Swift","type":"tags"}, ...]

  -- Contact 섹션
  contact_message  text,
  -- ex) '무언가를\n요청하고 싶다면'
  contact_email    text,
  -- ex) 'hello@lazydesk.studio'

  updated_at       timestamptz not null default now()
);

-- RLS 활성화 (읽기 공개)
alter table public.studio enable row level security;

create policy "studio_public_read"
  on public.studio for select
  using (true);

-- 초기 데이터 삽입
insert into public.studio (
  hero_lines,
  hero_accent,
  hero_subtitle,
  about_body,
  about_table,
  contact_message,
  contact_email
) values (
  ARRAY['Small, slow,', 'honest app', 'made'],
  'at a lazy desk.',
  '게으름이 허락된 책상에서 시작된 1인 창작 스튜디오',
  ARRAY[
    '현대 사회에서 책상은 대체로 생산성의 상징처럼 여겨졌습니다. 그래선지 앉는 순간 무언가 해야 할 것 같고, 아무것도 하지 않으면 왠지 뒤처지는 느낌이 들어요. 하지만 우리는 그 책상 위에서 자주 할 일을 미루고, 멍을 때리고, 괜히 책상 정리를 하기도 합니다. 그리고 사실은 그 느긋한 시간 속에서 진짜 아이디어가 떠오릅니다.',
    '레이지데스크 스튜디오(Lazydesk Studio)는 그런 게으름이 허락된 책상에서 시작된 1인 창작 스튜디오입니다. 기획, 디자인, 개발까지 모든 과정을 스스로 만들어가며, 누군가에게 필요하고 실용적인 (웹과 앱) 서비스를 만듭니다.',
    '빠르지 않아도 괜찮다는 믿음으로, 천천히 그러나 꾸준히 나아갑니다. 부지런한 새들이 서둘러서 먼저 벌레를 잡아도 괜찮아요. 저는 느긋하게 저만의 속도로 무언가를 만들고 있으니까요. 책상 앞에서.'
  ],
  '[
    {"k": "Practice",  "v": "Product design, frontend & iOS development", "type": "text"},
    {"k": "Tools",     "v": "Figma,React,Swift,Tailwind,Postgres",        "type": "tags"},
    {"k": "Languages", "v": "한국어 · English",                           "type": "text"},
    {"k": "Founded",   "v": "2023, Seoul",                                "type": "text"},
    {"k": "Lead time", "v": "대개 4 — 8주, 한 번에 한 프로젝트",           "type": "text"}
  ]'::jsonb,
  '무언가를' || E'\n' || '요청하고 싶다면',
  'hello@lazydesk.studio'
);
