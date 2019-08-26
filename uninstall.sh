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

echo "==> Uninstalling /usr/bin/md2all"
sudo rm /usr/bin/md2all

echo "==> Uninstalling /usr/lib/md2all.lib"
sudo rm /usr/lib/md2all.lib

echo "==> Uninstalling /usr/share/pandoc/data/templates/massilia.revealsjs"
sudo rm /usr/share/pandoc/data/templates/massilia.revealsjs

echo "==> Uninstalling config dir in ~/.config/md2all/"
sudo rm -R $HOME/.config/md2all

echo "================================================"
echo "==> UnInstall Totally Completed ..."
echo "==> Thanks for trying md2all :) ..."
echo "================================================"
