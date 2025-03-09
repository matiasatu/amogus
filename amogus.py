import smtplib
import random


def main():
    print("started running")
    # Email configuration
    SMTP_SERVER = 'smtp.gmail.com'
    SMTP_PORT = 587
    EMAIL_ADDRESS = 'matiasatu@gmail.com'
    EMAIL_PASSWORD = 'ftna vxoy hgwi sjdr'

    # Read emails and keywords from files
    with open('emails.txt', 'r') as f:
        emails = [line.strip() for line in f.readlines()]

    with open('keywords.txt', 'r') as f:
        keywords = f.read()

    # Select a random imposter
    imposter = random.choice(emails)

    # Set up SMTP server
    server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
    server.starttls()
    server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)

    # Send emails
    for email in emails:
        if email == imposter:
            message = f'Subject: Imposter Alert\n\nYou are the imposter!'
        else:
            message = f'Subject: Keywords\n\n{keywords}'
        
        server.sendmail(EMAIL_ADDRESS, email, message)

    server.quit()
    print("Emails sent successfully!")

if __name__ == "__main__":
    main()