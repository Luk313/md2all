% TD : My Nice Lesson Title
% Rodrigo SCHWENCKE, schwencke@lyceeperier.fr

>Note: 1°)  the .md file is strictly the same than the other theme example. the only difference is the command hereafter. 2°) The auto-numbering of markdown (sub-)headlines.

# First Some code Exemples with Massilia Dark Theme

## Command to Type

Command to type in Terminal:
```{.bash}
md2all -dark example.md
```

# Page 2

Command to type in Terminal:
```{.bash}
md2all -dark example.md
```

## HTML

```{.html .numberLines}
    <body>
        <div class="box">
            <div class="morpion">
                <div class="case">X</div>
                <div class="case">Y</div>
                <div class="case">Z</div>
                <div class="case">A</div>
                <div class="case">B</div>
                <div class="case">C</div>
                <div class="case">T</div>
                <div class="case">U</div>
                <div class="case">V</div>
            </div>
        </div>
    </body>
```

```{.html .numberLines startFrom="9"}
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

## CSS{.pagebreakbefore}

```{.css .numberLines}
@import url(https://fonts.googleapis.com/css?family=Questrial);
 body, p, #visible, .warning, {
	 font-family: Questrial, Andika, "Amerigo BT", Century, "Bookman URW", "Bitstream Vera Serif", "Free Sans", Georgia, Serif, Aerial, "Times New Roman", "STSong", "PT Serif";
	 line-height: 1.5rem;
 }
 
 .toc-title {
	 color:red;
 }

 p, ul {
	 text-align: justify;
	 margin : 0.1rem 0 0 0;
 }
```

## Javascript

```{.javascript .numberLines startFrom="14"}
var codeClasses = [];
    var codesList = document.querySelectorAll('code.sourceCode');
    for (var i = 0; i < codesList.length; i++) {
        codeClasses.push(codesList[i].classList[1]);
        codesList[i].classList.add("language-"+codeClasses[i]);
    }
```

## PHP

```{.php .numberLines  startFrom="4"}
<?php
echo "Hello World!";
?>
```

## Python

```{.python .numberLines}
#!/usr/bin/env python

"""
This Script does strictly nothing!
"""

import os

i=0
name = "me"
list = [1,2,3]

for i in range(100):
    if i%2==0:
        print("Pair!")

while i<10:
    i += 1

def maFonction(x):
    print("Hello",x)

if __name__ == "__main__":
    maFonction(" you!")
```

# LateX{.pagebreakbefore}
Hey! This is how to insert LaTeX code in your .md File, as a math inline formula $\sqrt 4  = 2$ , so this line goes on after the other inline formula $i^2$, or, as a block code: $$i_0=1; i_1=2$$
That's it!

# Matplotlib

A Matplotlib rendered Image, with Matplotlib syntax

```{.pyplot .imgbox}
import matplotlib.pyplot as plt

plt.figure()
plt.plot([0,1,2,3,4], [1,2,3,4,5])
plt.title('This is an example figure')
```

# Graphviz{.pagebreakbefore}

A Graphviz rendered Image, with the .dot syntax

```{.graph .center .imgbox caption="This was generated using the graphviz.py filter." name="jolifichier.svg"}
digraph G {

  bgcolor="#ffffff00"

  subgraph cluster_0 {
    style="filled, rounded";
    color="#E6EAF2"
    node [style=filled,color=white];
    a0 -> a1 -> a2 -> a3;
    a3 -> a1 [label = " -10" color=red fontcolor=red];
    label = "System A";
  }

  subgraph cluster_1 {
    node [style=filled color="#E6EAF2"];
    b0 -> b1 -> b2 -> b3;
    b0 -> b2 [label = " +12" color=green fontcolor=green];
    label = "System B";
    style="dashed, rounded"
    color=blue
  }

  start -> a0;
  start -> b0;
  a1 -> b3;
  a3 -> end;
  b3 -> end;

  start [label="load" shape=folder];
  end [label="store" shape=box3d];
}
```

# PlantUML

A plantUML rendered image :

```{.plantuml .center caption="This was generated using the PlantUML filter." name="jolifichier.uml"}
@startuml
actor client
node app
database db

db -> app
app -> client
@enduml
```

# Multi-Columns{.pagebreakbefore}

First Normal Paragraph

\

Second Normal Paragraph

::: cols

::: col12
Column 1, Normal Paragraph. Column 1, Normal Paragraph. Column 1, Normal Paragraph
:::

::: col22
Column 2, Normal Paragraph. Column 2, Normal Paragraph. Column 2, Normal Paragraph
:::

:::

Middle Paragraph. Middle Paragraph.
Middle Paragraph. Middle Paragraph.
Middle Paragraph. Middle Paragraph.
Middle Paragraph. Middle Paragraph.

::: cols

::: col13
Column 1, Normal Paragraph. Column 1, Normal Paragraph. Column 1, Normal Paragraph
:::

::: col23
Column 2, Normal Paragraph. Column 2, Normal Paragraph. Column 2, Normal Paragraph
:::

::: col33
Column 3, Normal Paragraph. Column 3, Normal Paragraph. Column 3, Normal Paragraph
:::

:::

Last Normal Paragraph. Last Normal Paragraph. Last Normal Paragraph.

Last Normal Paragraph. Last Normal Paragraph. Last Normal Paragraph.

# Images

![Caption 0: Original Size](grid.png)

![Caption 1: 40% width](grid.png){width="40%"} 

![Caption 2: Fixed width=300px and height=200px with style attribute](grid.png){style="width:300px;height:200px;"}

![Caption 3, with .noimgbox and width 20%](grid.png){.noimgbox width="20%"} 

![Caption 4, with custom class and attribute (cf html)](grid.png){.myClass myAttribute="myValue" width="40%"}
