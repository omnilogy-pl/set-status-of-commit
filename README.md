# Action designed to set the status of a commit with information about the successfully built container image based on it

| Version        | Author | Comment |
|:--------------|:------------:|:---|
| 1.0   | Slawek Zarzecki, Przemek Beigert | Initial commits |

## Example usage:

```yaml
- uses: omnilogy-pl/set-status-of-commit@main

  with:

    token: {token-with-commit-statuses-write-permissions}

    artifacts: {built-image}
```

## Required parameters:

- `artifacts`: Full name and tag of the built image 

- `token`: GitHub Token with commit status write permissions


## Using the the workflow token `${{ github.token }}` as value with granted additional permissions at job or workflow level:

```yaml

job-name:

  runs-on: ubuntu-latest 

  permissions: # Permissions granted at job level in which the action will be used 

    statuses: write 

  steps:

    # Your job steps here

```

## Additional (optional) parameters:

- `repo`: The name of the repository in format `owner/repo`, default current repository ( `github.repository`)

- `sha`:  The SHA hash of the commit to update, default current sha (`github.sha`)
