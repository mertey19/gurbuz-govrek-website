CREATE TABLE `appointments` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`grade_level` text NOT NULL,
	`service` text NOT NULL,
	`meeting_type` text NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`notice_acknowledged_at` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `appointments_created_at_idx` ON `appointments` (`created_at`);--> statement-breakpoint
CREATE INDEX `appointments_contact_idx` ON `appointments` (`email`,`phone`);