#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# go to /frontend
cd ..

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

# git init
# git checkout -B main
git add dist -f
git commit -m 'deploy with dist'

# go to the top level
cd ..

# push to gh-pages branch to trigger the deployment
git subtree push --prefix frontend/dist origin gh-pages
