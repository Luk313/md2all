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

echo "==> Install bin file in /usr/bin/"
sudo cp md2all /usr/bin/
sudo chmod 755 /usr/bin/md2all

echo "==> Install lib file in /usr/lib/"
sudo cp md2all.lib /usr/lib/
sudo chmod 755 /usr/lib/md2all.lib

echo "==> Install config dir in ~/.config/md2all/"
mkdir $HOME/.config/md2all
cp -R -i css $HOME/.config/md2all/

cp -R -i examples $HOME/.config/md2all/

cp -R -i filters $HOME/.config/md2all/

cp -R -i fonts $HOME/.config/md2all/

cp -R -i images $HOME/.config/md2all/

cp -R -i js $HOME/.config/md2all/

cp -R -i templates $HOME/.config/md2all/
# sudo ln -s $HOME/.config/md2all/templates/revealsjs/massilia.revealsjs /usr/share/pandoc/data/templates
sudo cp -R -i templates/revealjs/massilia.revealjs /usr/share/pandoc/data/templates

cp -i beamerconfig.yaml $HOME/.config/md2all

ln -s -i $HOME/.config/md2all/templates/lesson.template $HOME/.config/md2all/templates/default.template

echo "==> Install Correctly Completed ..."
echo "==> To export any .md file both in HTML and PDF,"
echo "==> In a Terminal, you can now type (as non-root user):"
echo "================================================"
echo "==> md2all yourMarkdownFile.md"
echo "================================================"
