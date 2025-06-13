<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Domain\Reservations\Data\Resources\ReservationResource;

class BookReservedNotification extends Notification
{
    use Queueable;

    public ReservationResource $reservation;

    public function __construct(ReservationResource $reservation)
    {
        $this->reservation = $reservation;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Reservation Created')
            ->greeting('Hello!')
            ->line('A new reservation has been registered with the following details:')
            ->line("**Reservation Code:** {$this->reservation->code}")
            ->line("**Book Title:** {$this->reservation->book_title}")
            ->line("**User Email:** {$this->reservation->user_email}")
            ->action('View All Reservations', url('/reservations'))
            ->line('Thank you for using our application!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'reservation_id' => $this->reservation->id,
            'user_id' => $this->reservation->user_id,
        ];
    }
}
