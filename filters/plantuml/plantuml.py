#!/usr/bin/env python

"""
Pandoc filter to process code blocks with class "plantuml" into
plant-generated images.
Needs `plantuml.jar` from http://plantuml.com/.
"""

import os
import sys
from subprocess import call

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
            for key,value in caption:
                sys.stderr.write('Caption Detected ' + str(key)+","+str(value) + '\n')

            filename = get_filename4code("plantuml", code)
            # sys.stderr.write("Original File Name = "+str(filename))

            # If name attribute exists, overwrite standard filename
            for eachKeys in keyvals:
                if 'name' in eachKeys[0]:
                    filename="plantuml-images/"+eachKeys[1][:-4]
                    sys.stderr.write("Custom File Name = "+str(filename))

            filetype = get_extension(format, "png", html="svg", latex="eps")

            src = filename + '.uml'
            dest = filename + '.' + filetype

            if not os.path.isfile(dest):
                txt = code.encode(sys.getfilesystemencoding())
                # txt = "".join(chr(x) for x in bytearray(txt,'utf-8'))
                txt=txt.decode('utf-8')
                if not txt.startswith("@start"):
                    txt = "@startuml\n" + txt + "\n@enduml\n"
                with open(src, "w") as f:
                    f.write(txt)
                call(["java", "-jar", "/usr/share/java/plantuml/plantuml.jar", "-t"+filetype, src])
                sys.stderr.write('Created image ' + dest + '\n')

            return Para([Image([ident, classes, keyvals], caption, [dest, typef])])

if __name__ == "__main__":
    toJSONFilter(plantuml)