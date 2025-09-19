## Search Endpoints

All major resources support flexible search via `POST /<resource>/search`.

Common filters:
- `Ids`: number[] — filter by ids
- `createdByIds`: number[] — filter by creator
- `createdAtStart` / `createdAtEnd`: ISO strings — date range
- `take` / `skip`: numbers — pagination
- `orderBy`: string, `order`: `asc`|`desc` — sorting

Resource-specific filters:
- `patients`: `gender`, `name` (contains), `dateOfBirthStart/End`
- `studies`: see existing `StudyService.search`
- `institutions`: `title` (contains), `abbreviation` (contains), `slung` (contains)
- `departments`: `title` (contains), `abbreviation` (contains)
- `categories`: `title` (contains), `abbreviation` (contains)
- `templates`: `categoryIds`, `createdByIds`, `title` (contains), `content` (contains)
- `tags`: `name` (contains)
- `user-role`: `userIds`, `role` (contains)
- `studyRemarks`: `studyIds`, `createdByIds`, `remarkType` (contains), `content` (contains)
- `studyAttachments`: `studyIds`, `createdByIds`, `fileName` (contains), `fileType` (contains)
- `notes`: `title` (contains), `content` (contains), `referenceId` (scoped to current user)

Example: Patients
POST `/patients/search`
```
{
  "Ids": [1, 8],
  "createdByIds": [1, 9],
  "gender": "male",
  "name": "john",
  "createdAtStart": "2025-01-01",
  "createdAtEnd": "2025-12-31",
  "take": 25,
  "skip": 0,
  "orderBy": "createdAt",
  "order": "desc"
}
```
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## PDF Reply Upload

When a study is published via `POST /studies/:id/publish`, the backend generates a PDF report and stores it under `uploads/`. After saving, it attempts to POST the PDF to an external service as multipart form-data with the field name `file`.

Environment variable:

```
REPLY_PDF_ENDPOINT=http://75.119.148.56:5000/api/studies
```

The final request URL pattern:

```
${REPLY_PDF_ENDPOINT}/${orthancInternalStudyId}/reply
```

If `REPLY_PDF_ENDPOINT` is unset, the default above is used. Failures are logged but do not block the publish response.

## Orthanc Integration

Environment variables controlling Orthanc connectivity (used for deletion and DICOM extraction):

```
ORTHANC_BASE_URL=http://109.123.244.17:8042
ORTHANC_USERNAME=optionalUsername
ORTHANC_PASSWORD=optionalPassword
```

When deleting a study via `DELETE /studies/:id`, the service:
- Removes related `StudyAttachment`, `StudyRemark`, `StudyTag` rows in a transaction
- Deletes attachment files under `/uploads/`
- Attempts a best-effort `DELETE /studies/{parentStudyReferenceId}` against Orthanc (if available)

Orthanc failures are logged and do not rollback the database deletion.
