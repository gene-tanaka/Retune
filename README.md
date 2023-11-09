# Retune
CS 147 Project Website: https://web.stanford.edu/class/cs147/projects/HarmoniousTies/Retune/

# Retune Setup Instructions
arch -x86_64 brew upgrade

1. Install Node.js and Watchman
arch -x86_64 brew install node
arch -x86_64 brew install watchman

2. Update Node.js and npm
nvm install node --reinstall-packages-from=node
npm install -g npm@latest

3. Install Ruby Development Environment
arch -x86_64 brew install rbenv
arch -x86_64 rbenv init
arch -x86_64 rbenv install 3.0.6
arch -x86_64 rbenv global 3.0.6

4. Install CocoaPods and Ruby Gems
sudo gem install cocoapods
sudo gem install json -v '2.6.3' --source 'https://rubygems.org/'
arch -x86_64 rbenv rehash

5. Create New React Native Application
npx react-native init Retune

6. Move into project directory and run project
cd Retune
npx react-native run-ios
