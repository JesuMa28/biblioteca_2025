<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Domain\Loans\Data\Resources\LoanResource;

class BookLoanedNotification extends Notification
{
    use Queueable;

    public LoanResource $loan;

    public function __construct(LoanResource $loan)
    {
        $this->loan = $loan;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Loan Created')
            ->greeting('Hello!')
            ->line('A new loan has been registered with the following details:')
            ->line("**Loan Code:** {$this->loan->code}")
            ->line("**Book Title:** {$this->loan->book_title}")
            ->line("**User Email:** {$this->loan->user_email}")
            ->line("**Loan Date:** {$this->loan->loan_date}")
            ->line("**Return Date:** {$this->loan->return_date}")
            ->line("**Status:** {$this->loan->status}")
            ->action('View All Loans', url('/loans'))
            ->line('Thank you for using our application!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'loan_id' => $this->loan->id,
            'user_id' => $this->loan->user_id,
        ];
    }
}
