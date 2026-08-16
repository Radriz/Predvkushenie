CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`event_type` text NOT NULL,
	`name` text NOT NULL,
	`contact` text NOT NULL,
	`event_date` text,
	`city` text,
	`guest_count` integer,
	`budget` text,
	`selected_style` text,
	`modules` text,
	`music_mood` text,
	`message` text,
	`source` text,
	`notify_status` text DEFAULT 'pending' NOT NULL
);
