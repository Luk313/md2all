#!/usr/bin/env python

"""
Pandoc filter to process code blocks with class "plantuml" into
plant-generated images.
Needs `plantuml.jar` from http://plantuml.com/.
"""

import os
import sys
import subprocess
# from subprocess import call,Popen

from pandocfilters import toJSONFilter, Para, Image, get_filename4code, get_caption, get_extension

def document_name():
    if "PANDOC_INPUT_FILE" in os.environ:
        return os.environ["PANDOC_INPUT_FILE"]
    else:
        return "plantuml"

def plantuml(key, value, format, _):
    if key == 'CodeBlock':
        [[ident, classes, keyvals], code] = value

        if "plantuml" in classes:
            caption, typef, keyvals = get_caption(keyvals)

            filename = get_filename4code(document_name(), code)

            # If name attribute exists, overwrite standard filename
            for eachKeys in keyvals:
                if 'name' in eachKeys[0]:
                    filename="plantuml-images/"+eachKeys[1][:-4]

            filetype = get_extension(format, "png", html="svg", latex="eps")

            src = filename + '.uml'
            dest = filename + '.' + filetype

            if not os.path.isfile(dest):
                txt = code.encode(sys.getfilesystemencoding())
                txt=txt.decode(sys.getfilesystemencoding())
                if not txt.startswith("@start"):
                    txt = "@startuml\n" + txt + "\n@enduml\n"
                with open(src, "w") as f:
                    f.write(txt)
                
                # Attempt to auto-detect plantuml.jar OUTSIDE HOME directory
                pathsListCmd=subprocess.Popen(['locate','plantuml.jar'],stdout=subprocess.PIPE)
                pathsList = pathsListCmd.stdout.read().decode('utf-8').split("\n")
                for eachPossiblePath in pathsList:
                    if 'home' in eachPossiblePath:
                        pass
                    else:
                        plantumlJarPath=str(eachPossiblePath)
                        sys.stderr.write('Path detected for plantuml.jar = ' + eachPossiblePath + '\n')
                        break
                else:
                    sys.stderr.write('plantuml.jar path not detected. Please install plantuml first ' + '\n')

                # plantumlJarPath should be something like: "/usr/share/java/plantuml/plantuml.jar", or to be adapted
                # If unsuccessful, replace following plantumlJarPath varriable by YOUR plantuml.jar path
                subprocess.call(["java", "-jar", plantumlJarPath , "-t"+filetype, src])
                sys.stderr.write('Created image ' + dest + '\n')

            return Para([Image([ident, classes, keyvals], caption, [dest, typef])])

if __name__ == "__main__":
    toJSONFilter(plantuml)