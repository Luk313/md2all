#!/bin/sh

# Ce logiciel est initialement un clone de md2html (Valéry Bruniaux)
# Author: Rodrigo SCHWENCKE

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

echo "================================================"
echo "==> Install bin file in /usr/bin/"
echo "================================================"

sudo cp md2all /usr/bin/
sudo chmod 755 /usr/bin/md2all

echo "================================================"
echo "==> Install config dir in ~/.config/md2all/"
echo "================================================"

mkdir $HOME/.config/md2all
cp -R -i css $HOME/.config/md2all/
ln -s -i $HOME/.config/md2all/css/lesson.css $HOME/.config/md2all/css/default.css

cp -R -i graphviz $HOME/.config/md2all/
ln -s -i $HOME/.config/md2all/graphviz/graphviz.py $HOME/.config/md2all/graphviz/default.py

cp -R -i js $HOME/.config/md2all/
ln -s -i $HOME/.config/md2all/js/script.js $HOME/.config/md2all/js/default.js

cp -R -i templates $HOME/.config/md2all/
ln -s -i $HOME/.config/md2all/templates/lesson.template $HOME/.config/md2all/templates/default.template

echo "================================================"
echo "==> Install completed ..."
echo "================================================"
