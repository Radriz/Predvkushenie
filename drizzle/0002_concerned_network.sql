CREATE TABLE `lead_rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer DEFAULT 1 NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_lead_rate_limits_expires_at` ON `lead_rate_limits` (`expires_at`);