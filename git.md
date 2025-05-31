# Working with Git

**Note**: Examples use *myorg* and *myproject* as organisation and project name.

## Help

    git <command> -help
    git help –all

## A new Client

Establish and sync a new local client to an existing remote repository.

    git clone git@github.com:myorg/myproject
    git pull git@github.com:myorg/myproject.git
    
Or via HTTPS (preferred).

    git clone https://github.com/myorg.myproject.git
    git pull https://github.com/myorg.myproject.git

The *pull* command is equivalent to a *fetch* and merge*. the *clone* command
sets up the local *main/master* branch to track the equivalent default branch
on the remote.

## A New Repository

If creating a new client without cloning a remote repository, then initialise
the working directory to begin tracking changes - and setup the .git metadata.

    git init

Init creates a *master* (or *main* in some cases) branch as the default branch.

## Remote Repositories [⎘](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes)

By default the remote name implicitly defaults to *"origin"* when cloning a
repository. That way we use the handle *origin* instead of the full URL name of
the remote repo when syncing changes between the two.

If a client was initialised (`init`), rather than cloned, then it wont yet have
a remote repository associated to the name *origin* but it can be added.

    git remote add origin https://github.com/myorg.myproject.git                # Init origin.

The current status for the remotes can be seen with:

    git remote -v                                                               # Origin config.

If we are already pointing at a repository but it's not the right one, then we
can re-point to a different repository.

    git remote set-url origin https://github.com/myorg.myproject.git            # Change origin.

We can also have multiple remote repositories, with local names other than
*origin*. The following adds *_localname* and points to the same remote repo.

    git remote add _localname https://github.com/myorg.myproject.git 

We may want to do this if we are working with a remote repository that is a fork
of some other remote repository. If we add *upstream* as a name pointing at the
original repository, we forked from, then we can pull/push from either.

Not surprisingly we can rename and remove local names for repositories.

    git remote rename _oldname _newname
    get remote rm _stalename

Note: Removing a local name for a remote repository has no impact on the remote
repository, it only affects the local client.

## Creating and Merging Branches [⎘](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)

Major changes should not be done against *main* but rather staged in a branch
that can be reviewed then merged.

    git branch _branch_name                                                     # Create new branch
    
Switch to the branch with checkout (`-b` creates the branch if it doesn’t exist).

    git checkout -b _branch_name

*Switch* is similar to checkout. With `-c` creating the branch beforehand and
`git switch -` popping you back to where you came from.

Note: *HEAD* is now pointing at this new branch. HEAD is where changes are
staged and committed.

The log command is a great way to see what branch (and commit) we are on.
To see all commits then add `--all`, and if you want to see the full tree then
add `--online --decorate --graph` as well.

    git log –oneline

A branch is really only a small file with the SHA of the commit it points to.

Note: Avoid leaving changes in the staging area of a branch. This can make
it problematic switching branches and merging.

## Working with Files

To see the status of which files have been changed, added, deleted, or staged
for the next commit.

    git status --short

Untracked files can be added.

    git add -all

But it's easier just to include them with the commit itself (`-a`).

    git commit -a -m “_comment”
    git push origin

## Reverting a Change

Roll back a change with a new commit (`–no-edit` skips the requirement for a
change message).

    git revert HEAD –no-edit                                                    # Reverts a commit
    # HEAD~x (x is number of revisions back) - reverts to an earlier change

Roll back a change undoing prior commit/s

    git reset _commithash

Update the last commit by removing and reapplying an edited replacement

    git commit –amend -m “_message”

## Branch Merging

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
