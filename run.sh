inp="";
echo "First Time?[Y/N]";
read inp

if [[ $inp == "Y" || $inp == "y" ]]; then
    yarn install;
    cd ./backend;
    pipenv install -r requirements.txt;
fi

selection="";
echo "Frontend or Backend?[F/B]";
read selection;

if [[ $selection == 'B' || $selection == 'b' ]]; then
    cd ./backend;
    pipenv run start;
fi
if [[ $selection == 'F' || $selection == 'f' ]]; then
    yarn run start;
fi