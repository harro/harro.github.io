# Working with Git

**Note**: All examples use *myorg* and *myproject* as the organisation and project name.

## Help

    git <command> -help
    git help –all

## New Project

Establish and sync a new client to an existing repository.

    git clone git@github.com:myorg/myproject
    git pull git@github.com:myorg/myproject.git
    
Or via HTTPS.

    git clone https://github.com/myorg.myproject.git
    git pull https://github.com/myorg.myproject.git

If creating a new repo for the first time, then initialise the working directory to setup the .git metadata and to begin tracking changes.

    git init

To see the status of which files have been changed, added, deleted, or staged for the next commit.

    git status

## Repoint Repository

    git remote -v			                        /* Review the repository config. */
    
    /* Rename “origin” to “upstream” for a repository we don’t own. */
    git remote rename origin upstream
    git remote add origin <our fork>	        /* New origin, pointing at our fork. */

## Creating and Merging Branches

Major changes should not be done against main but rather staged in a branch that can be reviewed then merged.

    git branch <branch>			                  /* Creates a new branch */
    
    /* Switch to branch. “-b” creates it if it doesn’t exist */
    git checkout -b <branch>		
    git switch <branch>			                  /* Same as above ? */
    
    git pull origin <label>                   /* gets updates from origin */
    git merge <branch>

Avoid squashing commits when merging - With Codespaces these squashed commits result in duplicate commits and merge conflicts.
As the merge cannot repoint to head due to the commit hashes being different.

Working with files

    git status –short 			                /* view branch and file status */
    git commit -a -m “<comment>” 	          /* “-a” includes “git add -all” */
    git log –oneline				                /* history of commits */
    git push origin				                  /* Changes pushed to remote repo */
    /* On Github create a new PR on foreign repo by pulling from ours. */

## Reverting a change

Roll back a change with a new commit.

    git revert HEAD –no-edit	              /* Reverts the latest change (commit). */
    /* –no-edit skips requiring a change message. */
    /* HEAD~x (x is number of revisions back)reverts an earlier change */

Roll back a change undoing prior commit/s

    git reset <commithash>

Update the last commit by removing and reapplying an edited replacement

    git commit –amend -m “<message>”

## Deleting a Branch

Double check the branch has no pending changes that are still desired.

    git branch -d <branch>		            /* Delete branch */
