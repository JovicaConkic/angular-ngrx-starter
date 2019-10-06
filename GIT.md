# Git and git flow

For every new feature we should create new branch from target branch, `master` or `development`. Target branch is the branch where we are planning to open Pull Request and merge our feature. After merging our feature in target branch, feature branch should be deleted.

## Interactive rebase and squash

When opening Pull Request from feature on target branch we should have only one commit present which uses conventional commit message (more about that you read in further text). Following that approach we would not have history log full of merged commits, conflicts etc. So, we will have:

- clean and consistent git log,
- we can easily find changes and who is responsible for those changes,
- nice and clean release changelog,
- better and easier code reviewing process,
- and other.

In our local branch or feature branch we are working on, we can have as many we like commits but when times come to open Pull Request on target branch we will need to have only one commit with conventional commit message. To achieve that we use interactive rebase with sqush of the commits.

More about that in this document [Interactive rebase, squash, amend](https://thoughtbot.com/blog/git-interactive-rebase-squash-amend-rewriting-history).

# Conventional commit

## Changelog generation

This is an attempt to standardise the release process, where we can communicate with
different stakeholders what is part of a releConventionase and what not. It also gives us
the ability to check directly from the version number what changed in that release.
Using semantic versioning we differentiate the kind of changes being made
during a release.

### **Semantic versioning**

Given a version number MAJOR.MINOR.PATCH, increment the:

- **MAJOR** version when you make incompatible API changes,
- **MINOR** version when you add functionality in a backwards-compatible manner, and
- **PATCH** version when you make backwards-compatible bug fixes.

We are strictly using this convention in order to simply identify the changes in a release.
In order to follow this convention, we will take full advantage of git commit messages.

Using a specific template system for the commits we can ensure that every change
follow into one of the previous mention categories: major, minor, patch.

### **Commitizen**

The specific template system that we are using come from
Angularjs and follow a structured commit message.

[https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md](https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md)

To help us writing those message template we are using commitizen.
It is a CLI utility that prompts directly in your shell all the required fields
that are needed to follow the convention.

To set it up, just follow the guide here [http://commitizen.github.io/cz-cli/](http://commitizen.github.io/cz-cli/) make sure to use alongside with `cz-conventional-changelog` commitizen. On top of the default configuration, we require that a JIRA/TRELLO ticket should always be present on a commit.

The template is as follows:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<BREAKING CHANGES>
<ISSUE>
```

- **type**: The change that you are committing.
- **scope**: Scope of the change identify the Module/Component/Service/Etc changed
- **subject**: Short imperative tense description
- **body**: Longer description
- **breaking changes**: Description of the breaking change ( if any ) issues: References to issues ( jira/trello etc tickets ) closed by the commit

The end result should follow this example:

> [<b>Doe, John</b>]() <b>commited</b> [<b>cblea745328</b>]() <b>4 days ago</b><br /><br />
> chore(storybook): Added tabs in stories
> <br /><br />
> Added tabs in stories (used common tabs) in order to display information from README.md,
> CHANGELOG.md and soon NOTES.md which will be used for designers notes. Also updated the storybook to
> v4 aplha
> <br /><br />
> re #[ARC-2]()

In order to create conventional commit message we can simply run following command in application.

```bash
yarn cz
```

More about [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/).

### **Conventional changelog**

Following the above template system allows not only to have a consistent
the way of handling your commits. What allow also is the ability to generate
automatically a CHANGELOG of all the changes.

The changelog is generated comparing different the current tag ( release )
with the previous one. All the commit messages are taken and they will
form an entry over the changelog.

### **Breaking changes**

A breaking change in an application will be one of the following:

- URL Parameters changes ( UPDATE/DELETE )
- Major Library updates
- Flow changes for the user
- Other changes which could break existing functionality

Any changes that only adds functionality is not considered as breaking change.
