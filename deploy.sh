#!/user/bin/env stylesheet

set -env

npm run build

git init
git add -A
git commit -m 'New Deployment'
git push -f 
git push -f git@github.com:LDixon2000/sorting-array-project.git main:gh-pages
cd -
