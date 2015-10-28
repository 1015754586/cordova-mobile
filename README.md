# cordova-mobile

https://mojo.redhat.com/docs/DOC-1044282/edit?ID=1044282

How to use it for developing

If you want to add or debug auto scripts, you can:

    login github, fork https://github.com/bluesky-sgao/entitlement-ci
    git clone https://github.com/**your_account**/entitlement-ci
    run at the first time: git remote add upstream https://github.com/bluesky-sgao/entitlement-ci
    run when you want to contribute to auto suite:
        git fetch upstream
        git merge upstream/master
        git add/rm ***
        git commit -m ""
        git push
        login github, send pull request
