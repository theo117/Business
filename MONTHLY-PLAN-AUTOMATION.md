# Monthly Plan Automation Workflow

This file documents the recommended automation flow for monthly-plan enquiries from `price.html`.

## Goal

When a visitor selects `Monthly plan` in the pricing enquiry form:

1. The enquiry should arrive with monthly-plan routing data.
2. The client should receive an automatic follow-up email.
3. That email should include:
   - the monthly-plan overview page
   - the Google qualification form
4. Standard enquiries should stay on the normal quote path.

## Form Fields Already Added

The pricing form now sends these useful values:

- `project_model`
- `enquiry_route`
- `followup_document`
- `qualification_form`
- `subject`

Monthly-plan submissions will send:

- `project_model = monthly-plan`
- `enquiry_route = monthly-plan`
- `followup_document = https://www.theodorenelson.co.za/monthly-plan-guide.html`
- `qualification_form = https://docs.google.com/forms/d/e/1FAIpQLSeLJJBFGW5cLMWCRofuarrPMCMuj5Tm8bD7e64GitC-KL9NLw/viewform?usp=dialog`

## Recommended Setup

Use:

- `Web3Forms` to receive the form submission
- `Web3Forms Webhook` to forward the submission
- `Make` or `Zapier` to route the follow-up emails

## Suggested Make Scenario

### Trigger

- Module: `Custom Webhook`
- Source: Web3Forms webhook payload

### Filter 1: Monthly plan enquiries

Condition:

- `enquiry_route` equals `monthly-plan`

### Action for Monthly plan enquiries

Send email to the client using:

- recipient: `email`
- subject: `Your Monthly Website Plan Follow-Up | Teodor Web Solutions`

Suggested email body:

```text
Hi {{name}},

Thank you for your enquiry.

Based on your selection, here is the Monthly Website Plan Overview:
{{followup_document}}

To help us prepare a more accurate recommendation, please complete the qualification form here:
{{qualification_form}}

Once we have reviewed your enquiry and qualification details, we can recommend the most suitable structure for your project.

Kind regards,
Teodor Web Solutions
```

### Optional internal notification

Send yourself or your team an internal email with:

- name
- email
- project_model
- message
- followup_document
- qualification_form

## Filter 2: Once-off or general enquiries

Condition:

- `enquiry_route` does not equal `monthly-plan`

### Action for standard enquiries

Send a normal acknowledgement email.

Suggested subject:

- `Thank you for your enquiry | Teodor Web Solutions`

Suggested email body:

```text
Hi {{name}},

Thank you for getting in touch.

Your enquiry has been received and we will review your project requirements and come back to you with the right next step.

Kind regards,
Teodor Web Solutions
```

## Suggested Zapier Logic

If using Zapier instead of Make:

1. Trigger: `Catch Hook`
2. Filter: `enquiry_route` exactly matches `monthly-plan`
3. Action: `Send Email`
4. Second Zap or branch:
   - filter: not monthly-plan
   - send standard acknowledgement

## Web3Forms Notes

You will need to configure the webhook in Web3Forms so submissions are forwarded to your automation platform.

If you prefer not to use a webhook, Web3Forms autoresponder can still send an automatic reply, but conditional monthly-plan routing is much easier through Make or Zapier.

## Google Form Role

The Google Form should act as a second-step qualification form, not the first contact form on the site.

That keeps the website enquiry simple while still giving you:

- project scope detail
- content readiness detail
- support and feature detail
- better qualification before quoting

## Deployment Checklist

Before turning the automation live:

1. Publish `monthly-plan-guide.html`
2. Confirm the live domain is correct
3. Confirm the Google Form link is correct
4. Configure the Web3Forms webhook
5. Test one `monthly-plan` submission
6. Test one `once-off-build` submission
7. Confirm the correct email path is triggered in both cases
