#!/bin/bash
echo "Pushing to git repository..."

#handle git add,commit and push
git add . 
git commit -m "Another commit" 
git push 

#deploy frontend to gh pages
echo "Deploying frontend to production server..."
npm --prefix frontend run build #build the dist folder in the frontend directory

cp frontend/dist/index.html frontend/dist/404.html

#copy index.html to 404.html to handle 404 errors in gh pages

npx gh-pages -d frontend/dist -r https://github.com/Mwavuna/football.git #push the dist folder in the frontend directory to the gh-pages branch of the repository

echo "Deployment complete!"

