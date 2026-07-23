CREATE TABLE IF NOT EXISTS website_comments (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  role VARCHAR(24) NOT NULL
    CHECK (role IN ('Öğrenci', 'Veli', 'Mezun', 'Diğer')),
  body VARCHAR(700) NOT NULL,
  status VARCHAR(16) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  submitter_hash CHAR(64),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  approved_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS website_comments_public_idx
  ON website_comments (status, approved_at DESC, created_at DESC);

CREATE INDEX IF NOT EXISTS website_comments_rate_limit_idx
  ON website_comments (submitter_hash, created_at DESC);

