# Working with Git

**Note**: Examples use *myorg* and *myproject* as organisation and project name.
A arguments that depend on the user are prefixed with an underscore.

## Help [⎘](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)

    git <command> -help
    git help –all

## A new Client

Establish and sync a new local client to an existing remote repository.

    git clone git@github.com:myorg/myproject                                    # Existing project
    git pull git@github.com:myorg/myproject.git                                 # Sync/merge remote
    
Or via HTTPS (preferred).

    git clone https://github.com/myorg.myproject.git
    git pull https://github.com/myorg.myproject.git

The *pull* command is equivalent to a *fetch* and merge*. the *clone* command
sets up the local *main/master* branch to track the equivalent default branch
on the remote.

## A New Repository

If creating a new client without cloning a remote repository, then initialise
the working directory to begin tracking changes - and setup the .git metadata.

    git init                                                                    # A fresh start

Init creates a *master* (or *main* in some cases) branch as the default branch.

## Remote Repositories [⎘](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes)

By default the remote name implicitly defaults to *"origin"* when cloning a
repository. That way we use the handle *origin* instead of the full URL name of
the remote repo when syncing changes between the two.

If a client was initialised (`init`), rather than cloned, then it wont yet have
a remote repository associated to the name *origin* but it can be added.

    git remote add origin https://github.com/myorg.myproject.git                # Init origin.

The current status for the remotes can be seen with:

    git remote -v                                                               # Remote config.

If we are already pointing at a repository but it's not the right one, then we
can re-point to a different repository.

    git remote set-url origin https://github.com/myorg.myproject.git            # Change a remote.

We can also have multiple remote repositories, with local names other than
*origin*. The following adds *_localname* and points to the same remote repo.

    git remote add _localname https://github.com/myorg.myproject.git            # Add a remote

We may want to do this if we are working with a remote repository that is a fork
of some other remote repository. If we add *upstream* as a name pointing at the
original repository, we forked from, then we can pull/push from either.

Not surprisingly we can rename and remove local names for repositories.

    git remote rename _oldname _newname                                         # Rename locally
    get remote rm _stalename                                                    # Remove remotely

**Note**: Removing a local name for a remote repository has no impact on the
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

**Note**: *HEAD* is now pointing at this new branch. HEAD is where changes are
staged and committed.

The log command is a great way to see what branch (and commit) we are on.
To see all commits then add `--all`, and if you want to see the full tree then
add `--online --decorate --graph` as well.

    git log –oneline                                                            # Where are we

A branch is really only a small file with the SHA of the commit it points to.

Note: Avoid leaving changes in the staging area of a branch. This can make
it problematic switching branches and merging.

## Working with Files

The working directory is a scratchpad for making changes. It's easy and low
cost to update or remove changes.

Staged changes sit in between the working directory and a commit. Planned
changes are organised here in preparation for committing. Often this step is
skipped (`-a` flag) but runs the risk of producing unclean commits.

**Note**: Organise commits so that that they tell a coherent and succinct
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

    git mv _oldpath/oldfilename _newpath/newfilename                            # Move files
    git rm _filename                                                            # Remove files

Conversely to remove a file from being tracked by git, but leave it in the
local filesystem.

    git rm --cached _filename                                                   # Untrack files

## Regretting a Change [⎘](https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things)

Staged a file and have changed your mind and want to unstage it.

    git restore --staged _filename    # Supersedes "git reset HEAD _filename"   # Unstage a file

Now that it is unstaged the modifications can be removed completely.
**Warning**: Changes to the file will be lost!

    get restore _filename             # Supersedes "git checkout -- _filename"  # Remove edits

If we want to remove all changes in this branch.

    git checkout .                                                              # Remove all edits

### Changing the Commit [⎘](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)

Committed too early, want to add more changes, or reword the message.

    git commit --amend                                                          # Update last commit

Not happy with the commit. Roll back a change with a new commit (`–no-edit`
skips the requirement for a change message). Where *HEAD~x* reverts to an
earlier change (x is number of revisions back).

    git revert HEAD –no-edit                                                    # Revert commit/s

Roll back a change by undoing prior commit/s (rather than above, where we add a
new commit that is effectively a roll back).

    git reset _commithash

Update the last commit by removing and reapplying an edited replacement

    git commit –amend -m “_message”

## Branch Merging [⎘](https://git-scm.com/book/en/v2/Git-Branching-Branch-Management)

Merges are performed by moving (checkout/switch) to the branch where you want to
merge. Ensure the branch is up to date with the remote repository by pulling
from the *origin* then merging in the branch with the desired changes.

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

**Note**: On github avoid squashing commits when merging. With Codespaces these
squashed commits result in duplicate commits and merge conflicts.
As the merge cannot rebase to head due to the commit hashes being different.

### Deleting a Branch

Double check the branch has no pending changes that are still desired. Delete
branches that are no longer needed.

    git branch -d _branch                                                       # Delete branch

To know which branches can be safely removed (`-v` shows the commit it points
at).

    git branch --merged

Or ones that are yet to be merged.

    git branch --no-merged

## Renaming Branches

It is becoming increasingly common for the default branch *master* to be named
*main*. If we were to do that then it i s a multi step process.

1. Rename the branch locally.
1. Push to the remote.
1. Delete the old branch on the remote.

    git branch --move master main
    git push --set-upstream origin main
    git push origin --delete master