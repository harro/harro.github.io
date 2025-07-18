# Working with Git

This document is half cheat-sheet, half refresher - for the occasions when I've
spent time away from Git and have let myself get rusty (my day-to-day work is
with Subversion/Mercurial).

Published here just in case its useful for others.

> **Note:** Examples use *myorg* and *myproject* as organisation and project name.
Arguments that depend on the user inputs are prefixed with an underscore.

## Help [⎘](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)

    git _command --help
    git help –all

> **Note:** Several commands `add`, `reset` and `stash` take `-p` as an argument
and apply changes progressively. Several commands `add`, `clean` and `rebase`
take `-i` as an argument to make changes interactively.

## A New Client

Establish and sync a new local client to an existing remote repository.

    git clone git@github.com:myorg/myproject                                    # Existing project
    git pull git@github.com:myorg/myproject.git                                 # Sync/merge remote
    
Or via HTTPS.

    git clone https://github.com/myorg.myproject.git                            # HTTPS is preferred
    git pull https://github.com/myorg.myproject.git

The *pull* command is equivalent to a *fetch* and merge*. the *clone* command
sets up the local *main/master* branch to track the equivalent default branch
on the remote.

## A New Repository

If creating a new client without cloning a remote repository, then initialize
the working directory to begin tracking changes - and setup the .git metadata.

    git init                                                                    # A fresh start

Init creates a *master* (or *main* in some cases) branch as the default branch.

## Remote Repositories [⎘](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes)

By default the remote name implicitly defaults to *"origin"* when cloning a
repository. That way we use the handle *origin* instead of the full URL name of
the remote repo when syncing changes between the two.

If a client was initialized (`init`), rather than cloned, then it wont yet have
a remote repository associated to the name *origin* but it can be added.

    git remote add origin https://github.com/myorg/myproject.git                # Init origin.

The current status for the remotes can be seen with:

    git remote -v                                                               # Remote config.

If we are already pointing at a repository but it's not the right one, then we
can re-point to a different repository.

    git remote set-url origin https://github.com/myorg/myproject.git            # Change a remote.

We can also have multiple remote repositories, with local names other than
*origin*. The following adds *_local_name* and points to the same remote repo.

    git remote add _local_name https://github.com/myorg/myproject.git           # Add a remote

We may want to do this if we are working with a remote repository that is a fork
of some other remote repository. If we add *upstream* as a name pointing at the
original repository, we forked from, then we can pull/push from either.

Not surprisingly we can rename and remove local names for repositories.

    git remote rename _old_name _new_name                                       # Rename locally
    get remote rm _stale_name                                                   # Remove remotely

> **Note:** Removing a local name for a remote repository has no impact on the
remote repository, it only affects the local client.

## Creating and Merging Branches [⎘](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)

Major changes should not be done against *main* but rather staged in a branch
that can be tested, reviewed then merged. Branches will have a unique change
history and changes in a branch are distinct to that branch.

    git branch _branch_name                                                     # Create new branch
    
Switch to the branch with checkout (`-b` create the branch if it doesn’t exist).

    git checkout -b _branch_name                                                # Work in a branch

*Switch* is similar to checkout. With `-c` creating the branch beforehand and
`git switch -` popping you back to where you came from.

> **Note:** *HEAD* is now pointing at this new branch. HEAD is where changes are
staged and committed.

The log command is a great way to see what branch (and commit) we are on.
To see all commits then add `--all`, and if you want to see the full tree then
add `--online --decorate --graph` as well.

    git log –oneline              // --all --online --decorate --graph          # Where are we
    git reflog                                                                  # Where HEAD was

The `branch` command can also show this.

    git show-branch _branch_name  // --all                                      # Branch state

A branch is really only a small file with the SHA of the commit it points to.

Other commands for viewing, navigating and organizing branches.

    git branch                                                                  # List branches
    git branch -r                                                               # List remotes
    git branch -a                                                               # local and remote
    git branch -m _old_name _new_name                                           # Rename branch
    git branch -d _branch_name                                                  # Delete branch
    git push --delete _remote_name _branch_name                                 # Delete remote

> **Warning:** Edits and staged changes only exist in the current branch. Use
stashing in order to change branches without losing data.

## Working with Files [⎘](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)

The working directory is a scratchpad for making changes. It's easy and low
cost to update or remove changes.

Staged changes sit in between the working directory and a commit. Planned
changes are organized here in preparation for committing. Often this step is
skipped (`-a` flag) but runs the risk of producing unclean commits.

> **Note:** Organize commits so that that they tell a coherent and succinct
narrative of the changes made to the project.

To see the status of which files have been changed, added, deleted, or staged
for the next commit.

    git status --short                                                          # Status of work

Untracked files can be added.

    git add -all                                                                # Staging

But it's easier just to include them with the commit itself (`-a`).

    git commit -a -m “_comment”                                                 # Commit work
    git push origin                                                             # Sync to remote

Files can be moved or removed with the corresponding git commands.

    git mv _old_path/old_filename _new_path/new_filename                        # Move files
    git rm _filename                                                            # Remove files

Conversely to remove a file from being tracked by git, but leave it in the
local filesystem.

    git rm --cached _filename                                                   # Untrack files

## Regretting a Change [⎘](https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things)

Staged a file and have changed your mind and want to unstage it.

    git restore --staged _filename    # Supersedes "git reset HEAD _filename"   # Unstage a file

Now that it is unstaged the modifications can be removed completely.
> **Warning:** Changes to the file will be lost!

    get restore _filename             # Supersedes "git checkout -- _filename"  # Remove edits

Want to add more files/changes to pending commit, or reword the message (`-m`).

    git add _filename                                                           # Stage new file
    git commit --amend                                                          # Update last commit

If there are files that shouldn't be in the commit and you want to remove them.
First reset the HEAD for the file then amend the commit.

    git reset HEAD^ -- _filename                                                # Reset single file
    got commit --amend                                                          # Update last commit

If we want to remove all changes, staged or in a pending commit.

    git checkout .                                                              # Flush the branch  

### Changing the Commit [⎘](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)

#### Revert

Not happy with commit/s after the fact. i.e. submitted/synced and want to
rollback. Roll the change/s back with a new commit that cancels out the change
(`–no-edit` skips the requirement for a change message).
Where `HEAD~x` reverts to an earlier change (x is number of revisions back).

    git revert HEAD –no-edit                                                    # Revert last commit

    git revert HEAD~n –no-edit                                                  # Revert n commit/s

    git revert _commit                                                          # A specific commit

> **Note:** `revert` is additive, no commit is actually lost, merely nullified by
a new commit.

#### Reset

Reset moves where HEAD points to in the chain.

Roll back a change by actually undoing prior commit/s as if they never happened
(rather than above, where we add a new commit that is effectively a roll back).

Reset moves where HEAD is pointing. What it does with the commits that are
after that point depends on the flags. By default (`--mixed`) all the changes
that were part of subsequent commits are now edits in the working location
(unstaged). We may prefer for them to be staged (`--soft`) or deleted entirely
(`--hard`).

    git reset _commit_hash                                                      # Undo commits

Update the last commit by removing and reapplying an edited replacement

    git commit –amend -m “_message”                                             # Update commit msg

## Branch Merging [⎘](https://git-scm.com/book/en/v2/Git-Branching-Branch-Management)

Merges are performed by moving (checkout/switch) to the branch where you want to
merge. Ensure the branch is up to date with the remote repository by pulling
from the *origin* then merging in the branch with the desired changes.

The flags `--strategy=ours` and `--strategy=theirs` tells merge to favor the
destination, or the source when resolving conflicts. The commit history in the
branch can be squashed into a single commit with `--squash`.

    git switch master
    git pull origin _label                                                      # Update from origin
    git merge _branch_name

If the branch being merged is further along the same change then there will be
a *fast-forward*, which is a simple branch re-pointing. Otherwise the changes
are three-way merged - Automatically if no conflicts.

### Merge Conflicts

If there are merge conflicts then there will be newly modified files with those
conflicts. Edit the files, search for the `======` conflicts, resolve and then
stage and commit.

> **Note:** On github avoid squashing commits when merging. With Codespaces these
squashed commits result in duplicate commits and merge conflicts.
As the merge cannot rebase to head due to the commit hashes being different.

### Deleting a Branch

Delete branches that are no longer needed.

    git branch -d _branch                                                       # Delete branch

> **Note:** This command will warn if there are unmerged changes.

To know which branches are no longer needed because they have no unmerged
changes (`-v` shows the commit it points at).

    git branch --merged                                                         # Merged branches

Or conversely ones that are yet to be merged.

    git branch --no-merged                                                      # Unmerged branches

### Pruning a Branch

Don't like any of the commits in this branch. Then the branch and the entire
chain of commits can be deleted.

    git branch -D _branchname                                                   # Delete branch

> **Warning:** Definitely use caution here.

## Renaming Branches

It is becoming increasingly common for the default branch *master* to be named
*main*. If we were to do that then it i s a multi step process.

1. Rename the branch locally.
1. Push to the remote.
1. Delete the old branch on the remote.

Sequence of commands.

    git branch --move master main                                               # Rename master
    git push --set-upstream origin main
    git push origin --delete master

## Cleaning up the Commit Log [⎘](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)

Should our history have a lengthy sequence of commits and it makes better sense
to have less. The commits can be squashed, reworded or edited interactively.

Use `rebase` to have a linear commit history - unlike the `merge` command. So
instead of merging a branch to main, we replay the changes on main
interactively.

    git checkout _branch_name                                                   # Rebase a branch
    git rebase master

On the same branch we can rebase to an earlier commit to clean the commits
before that point.

    git rebase -i HEAD              # HEAD~n                                    # Rebase ourselves
    git rebase --continue                                                       # Resume rebase
    git rebase --abort                                                          # Cancel rebase
    git rebase --skip                                                           # Skip a commit

> **Warning:** Only clean a commit history that is still local to your client.

## Stashing Changes [⎘](https://git-scm.com/book/en/v2/Git-Tools-Stashing-and-Cleaning#_git_stashing)

Made a mess, don't want to clean it up before working on something else. Stash
both the staged changes and unstaged edits (`-u` to also stash new untracked
files, or even ignored files with `-a`).

    git stash                                                                   # Clean workspace
    git stash list                                                              # Stashes
    git stash apply     # stash@{n} --index # to re-stage changes               # Mess is back!
    git stash drop _stash_name                                                  # Delete stash
    git stash pop _stash_name    # Same as the above two commands, in one

> **Warning:** This can get even messier if applying the stash to a working
directory that is not clean. Or a branch where additional commits have since
been made. There will be potential merge conflicts. To create a new branch
pointing at the same commit as the original stash had.

    git stash branch _new_branch_name                                           # Unstash cleanly

### Cleaning Cruft

A safe way to clean untracked files from a working directory is to stash
everything first, then clean. The `clean` command can also be run with `-n`
(instead of `-f`) or `-i` to dry run first or run interactively.

    git stash --all                                                             # Full save
    git clean -f -d         # -x to also clean files matching your .gitignore   # Delete untracked

## Sources

* [Git ⎘](https://git-scm.com/doc)
* [Github ⎘](https://docs.github.com/en/get-started/using-git/about-git)
* [w3Schools ⎘](https://www.w3schools.com/git/git_tagging.asp?remote=github)
* [Atlassian ⎘](https://www.atlassian.com/git/glossary#commands)
* [Flavio Copes ⎘](https://flaviocopes.pages.dev/books/git-cheat-sheet.pdf)

## Playbook / Cookbook

Some scenarios where you need to know what to do but (hopefully) don't need to
do it very often.

### Remove a Commit from the Chain

Assumes several commits have followed, and a sync to remote has happened at
least once after the offending commit. Maybe a merge form a branch too.

    $ git log --oneline
    14d8690 (HEAD -> main, origin/main) Merged
    a8bbf03 Main commit 2
    2cc6e3a (branch1) Branch1 commit 2
    e3ed2b6 Branch1 commit 1        # <-- Remove commits after here
    db69af9 Initial file creation.

Reset moves where HEAD is pointing.

    git reset e3ed2b6       # Uncommits/unstages subsequent changes.            # Undo commits

HEAD has been moved back to the specified commit.

    $ git log --oneline
    e3ed2b6 (HEAD -> main) Branch1 commit 1
    db69af9 Initial file creation.

Subsequent changes are still present in the client but are unstaged.

    $ git status
    On branch main
    Your branch is behind 'origin/main' by 3 commits, and can be fast-forwarded.
    (use "git pull" to update your local branch)

    Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git restore <file>..." to discard changes in working directory)
        modified:   test_file.txt

    no changes added to commit (use "git add" and/or "git commit -a")

Roll forward the unstaged changes with a new commit.

    git commit -a --no-edit

Changes are back, but the commit history no longer has `14d8690`, `a8bbf03` or
`2cc6e3a` commits.

    $ git log --oneline
    8cd6a52 (HEAD -> main) Reapplied in main.
    e3ed2b6 Branch1 commit 1
    db69af9 Initial file creation.

To push and update the remote repo `--force`` is needed as the remote repo is
ahead.

Warning: Care should be taken to avoid overwriting changes made by other
parties.

    $git push --force       # Force needed as we are now behind the remote.

### Clean up a Messy Commit Chain

The `rebase` command can be run interactively:

    $git rebase -i                                                              # Edit commit chain

* `pick` to keep a commit,
* `reword` to change the commit message.
* `squash` (or `fixup`) will combine the commit/s with the prior one.
* `drop` to remove any unwanted commits.
* `edit` to split or change a commit.

> **Note:** it will drop to the command line to allow the changes to be made in
the case of an `edit`. Or puts you in an editor to merge messages for a `squash`

Resume with the `git rebase --continue` command.

If you change your mind and want to abandon the changes

    $git rebase --abort

Or see [reflog](https://git-scm.com/book/en/v2/ch00/_data_recovery) if you've
really broken things.

### Remove a file from Commit Chain

Committed a file with sensitive information, or a bloated binary. The
`filter-branch` with `--tree-filter` can be used to run a command against each
commit and reapplies the commit after the change.

    $git filter-branch --tree-filter `rm -f _file_to_remove` HEAD

> **Note:** Run this against a branch to make sure it has done what was intended.

### Belatedly Fix your Email Address

Forgot to run `git config` to setup your email address, or don't want to leak
your private email address in a public repo - The `filter-branch` can be used
with `--commit-filter` to fix that after the fact.

    $ git filter-branch --commit-filter '
            if [ "$GIT_AUTHOR_EMAIL" = "my_private_address@example.com" ];
            then
                    GIT_AUTHOR_EMAIL="replacement_address@example.com";
                    git commit-tree "$@";
            else
                    git commit-tree "$@";
            fi' HEAD