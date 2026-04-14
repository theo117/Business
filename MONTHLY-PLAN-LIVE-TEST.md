# Monthly Plan Live Test

This file is a practical checklist for running one real test of the monthly-plan workflow on the live site.

## Purpose

Confirm that a monthly-plan enquiry moves through the expected public and manual follow-up path.

## Before You Start

Make sure these pages are live:

- `price.html`
- `thank-you.html`
- `monthly-plan-guide.html`

Also confirm:

- your Google Form link is correct
- your Web3Forms email inbox is working

## Test Data To Use

Use a real email address you can access.

Suggested test values:

- Name: `Monthly Plan Test`
- Email: your own email
- Project Model: `Monthly plan`
- Project Brief: `This is a test of the monthly-plan enquiry workflow for a larger business website.`

## Step 1. Submit The Form

Go to:

- `https://www.teodordev.co.za/price.html`

Then:

1. Fill in the form
2. Select `Monthly plan`
3. Submit

## Expected Result

- the form should submit successfully
- you should land on:
  - `https://www.teodordev.co.za/thank-you.html`

## Step 2. Check The Thank-You Page

Confirm the thank-you page shows:

- the enquiry confirmation message
- the monthly-plan next-step section
- a button to the monthly guide
- a button to the Google qualification form

## Expected Result

The thank-you page should make sense even without automation.

Monthly-plan leads should be able to continue immediately.

## Step 3. Check The Monthly Guide

From the thank-you page, open:

- `monthly-plan-guide.html`

Confirm:

- the page loads correctly
- the copy reads clearly
- the qualification form button works

## Step 4. Check Your Email Inbox

Look for the Web3Forms submission email.

Confirm it contains the enquiry details, especially:

- name
- email
- `project_model`
- `enquiry_route`
- `followup_document`
- `qualification_form`

## Expected Result

The monthly-plan enquiry should be easy to identify from the email.

## Step 5. Send The Manual Monthly-Plan Reply

Use the template from:

- `ENQUIRY-RESPONSE-TEMPLATES.md`

Send the monthly-plan response to your own email address.

## Step 6. Complete The Qualification Form

Open your Google Form and submit one test response.

Confirm:

- the form works
- the confirmation message looks correct
- the answers arrive where you expect them

## Step 7. Review The Whole Flow

After the test, ask:

1. Was the website path clear?
2. Was the thank-you page useful?
3. Did the Web3Forms email contain enough information?
4. Was the monthly-plan reply easy to send?
5. Did the Google Form collect the right detail?

## If Something Feels Weak

Typical fixes:

- if the thank-you page feels weak: improve the wording
- if the email feels too manual: keep using templates
- if the Google Form feels too long: remove optional questions
- if the Google Form feels too vague: strengthen the support and scope questions

## Final Goal

At the end of this test, you should know whether the current free-plan workflow is practical enough to use day to day until you later move to automation.

