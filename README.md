# What is md2all ?
**md2all** is a command line OpenSource tool which can **convert Markdown files to HTML and PDF** with predefined CSS styles, and further JS treatment.

# What to do with md2all ?

* **Edit your Markdown** file for beautiful exports in HTML and PDF. Both HTML and PDF files should look pretty the same, so you can **put the HTML file on the web** and/or **print the PDF file** for your students.
* **LaTeX Formulas**:
The purpose is to replace **LaTeX** to **produce standard documents** like lessons, articles, etc.
LaTeX is a good tool but styling markdown with CSS is easier and more flexible than old LaTeX syntax.
* **Style the HTML and PDF export files in CSS and JS**, via media print for PDF export, edit contents with markdown and you can generate beautiful documents in HTML and PDF.
* **Beautiful Code Highlightling**: This includes:
  * **Automatic LineNumbering**: Natively included in md2all.
  * **Two Beautiful Code Themes named Massilia themes AND a *DUAL* Theme** (inspired by prism.js themes)
  * **Automatic Code Language Detection AND Labelisation**, both in HTML and PDF exports. Nothing to do here... **AUTOMATIC ! Magic ! :sparkles: :star: :star: :star: :star: :star:**
* [**Matplotlib**](https://matplotlib.org): Natively include Matplotlib rendered images in your HTML and PDF exports, in **Python language** with **Matplotplib's pyplot syntax**.
  For more info, cf:
  * [MatplotLib Gallery](https://matplotlib.org/gallery/index.html)
  * [Matplotlib Official Site](https://matplotlib.org/) for more info.
  * [A Matplotlib Tutorial for beginners, by Nicolas P. Rougier](https://github.com/rougier/matplotlib-tutorial)
* [**Graphviz**](https://www.graphviz.org): Natively include Graphviz rendered images in your HTML and PDF exports, with ***.dot language*** syntax. All you need to do is to type your Graphviz code in your md file as follows: \`\`\`{.graph } *(Graphviz code comes here)* \`\`\`. For more info, cf:
  * [Graphviz Gallery](https://www.graphviz.org/gallery/)
  * [Graphviz Documentation](https://www.graphviz.org/documentation/)
* [**PlantUML**](http://plantuml.com): Natively include PlantUML Diagrams rendered as SVGs in your HTML and PDF exports. For more info about PlantUML syntax, cf:
  * [PlantUML Official Site](http://plantuml.com)
  * [Just Some Diagrams and Example Gallery](http://plantuml.com/fr/sequence-diagram)
* Easy PDF page layout with froce page breaks (*before* or *after*)

# What do I need to install ?

## First, Install dependencies :
**md2all** mainly uses 2 external tools you **must** install at first, via your preferred package manager:

 * [pandoc](https://pandoc.org/) for HTML export
 * [wkhtmltopdf](https://wkhtmltopdf.org/) for PDF export. ️⚠️ **Watch Out!** ⚠️ According to your linux distribution and to what functionnalities of **md2all** you want to take advantage of, you may need the **Qt-patched version of wkhtmltopdf**. Typically, if you are in one of the following cases:
   * if you want footers in PDF, or...
   * if you just want to use the ***--print-media-type*** option in wkhtmltopdf, so to customize PDF exports via print media specific css (which is md2all case, by default)
   * then you **NEED** the QT-patched version (in Arch Linux: the **wktohtmlpdf-static** package in AUR)!

Optionnally, If you wish to use the following additionnal fonctionnalities, You **can** install these tools via your preferred package manager:

* **LaTeX :**
If you want to use LaTeX equations, you can choose alternatively one (or both) of the following:
  * __offline (by default):__ install your preferred local LaTeX distribution (mainly ***texlive-most***, optionally ***texlive-lang***): **md2all** will automatically export LaTeX formulas of your md file using [KaTeX](https://katex.org/)for the HTML export file, and hence also PDF. 

  * __web :__ do NOT install any local LaTeX distribution (by default), and use **internet access** to reach the transform application [codecogs](http://latex.codecogs.com/svg.latex) to convert LaTeX formulas in SVG.
* **Maplotlib**: You must install **python** (>=3.xx), the **python-matplotlib** package, and the **pandoc-pyplot** package.
* **Graphviz**: You must install the **graphviz** package, of your preferred Linux distribution.
* **PlantUML**: You must install the **plantuml** package (alternatively: with java installed in your machine, just download the file [***plantuml.jar***](http://sourceforge.net/projects/plantuml/files/plantuml.jar/download) and place it somewhere **OUTSIDE your $HOME directory** - preferably in /usr/something), of your preferred Linux distribution.

## Next, How to install md2all?
* In a Terminal, cd /some/where/you/want/../anywhere
* Clone this repository: ```git clone https://github.com/Luk313/md2all.git```
* cd inside the directory: ```cd md2all```
* Launch installer, i.e. run .sh file: ```sh install.sh``` or ```./install.sh``` That's all Folks! 

## How to uninstall md2all?
* in a Terminal: cd to the directory where you downloaded md2all, you should see ```unsinstall.sh``` file
* Launch uninstaller, i.e. run .sh file: ```sh uninstall.sh``` or ```./uninstall.sh```

# Usage of md2all :

## **md2all** requires 1 and only argument, but it accepts options (linux style) : *yourMarkdownFile.md*

* **Usage** : the following command exports the md file, both in HTML and PDF, in the same folder.
```{.bash}
md2all myMarkdownDile.md
```

* **General Syntax** :
```{.bash}
md2all [options] myMarkdownDile.md
```
Currently, the help (-h or --help) option is still not implemented.
Some useful options details are found hereafter:
* -hi | -hs | -highlight | -highlight-style | --highlight | --highlight-style
  * sets the highlight style (default is: *$HOME/.config/md2all/css/massiliaDark.theme*)
* -c | -css | --css
  * sets the page css style file (default is : *$HOME/.config/md2all/css/lesson.css*)
* -t | -template | --template
  * sets the template config file (default is : *$HOME/.config/md2all/templates/lesson.template*)
* -cs | --code-css | --code-style
  * sets the code style, possible values: *dark*, *light* or *dual*
* -dual | --dual (the default)
  * sets the code style to dual (dark for HTML and light for PDF)
* -dark | --dark
  * sets the code style to dark (for both HTML and PDF)
* -light | --light
  * sets the code style to light (for both HTML and PDF)
* -web | --web
  * render HTML and PDF via web servers (for LaTeX mainly for the moment)
* -off | -offline | --offline | -loc | -local | --local
  * render HTML and PDF offline/locally (for LaTeX mainly for the moment)
* -h | -help | --help
  * Help... not implemented yet (this page is a reference) 
* See example folder for some .md examples.

## Header and Pandoc Title Block

All [pandoc extensions](https://pandoc.org/MANUAL.html#pandocs-markdown) for markdown are usable (equation, emoji, tables, ...).

At the beginning of markdown file put a [Pandoc Title Block](https://pandoc.org/MANUAL.html#metadata-blocks) to describe your document like this :

% The Wonderful title  
% My Name  
% 20/04/2018  

This block supports multilines, but continuation lines must begin with leading space, thus:

% The Wonderful title  
  You can have a multilines title like this  
% My Name  
  And my friend  
  And another one  
% 20/04/2018

After a blank line you can write your document using markdown syntax. Look example files in examples directory.

## Code Styling:
Code Styling can be used or customised via the following instructions:
### LineNumbering
All you need to do is to type your code in your .md file as follows
```
    ```{.YourLanguage .numberLines} 
    (Your code comes here)
    ```
```
or, if you need more precision:
All you need to do is to type your code in your .md file as follows:
```
    ```{.YourLanguage .numberLines startFrom="4"} 
    (Your code comes here)
    ```
```
>Note that *.YourLanguage* class is not compulsory, neither for code block to render nicely, neither for auto-detection.

### Massilia Themes
* **a Dark Theme**, named ***Massilia Dark Theme***: This code Highlighting theme is easily customisable via three files: 
    * **For Code Color (letters, keywords, etc)**: a Pandoc exported and customisable theme file, named ***```massiliaDark.theme```***
    * **For Code Layout** : ***```massilia.css```*** file
    * **For Code Background Color** (just a Hack, purely technical): ***```massiliaDarkHack.css```***
  
    Usage: the following commands export the **Dark Theme to BOTH HTML *AND* PDF**
    ```
    md2all -dark yourMarkdownFile.md
    ```
    Alternatively, use the CodeStyle -cs option :
    ```
    md2all -cs dark yourMarkdownFile.md
    ```
* **a Light Theme**, named ***Massilia Light Theme***: This code Highlighting theme is easily customisable via three files: 
  * **For Code Color (letters, keywords, etc)**: a Pandoc exported and customisable theme file, named ***```massiliaLight.theme```***
  * **For Code Layout** : ***```massilia.css```*** file
  * **For Code Background Color** (just a Hack, purely technical): ***```massiliaLightHack.css```***

  Usage: the following commands export the **Light Theme to BOTH HTML *AND* PDF**
    ```
    md2all -light yourMarkdownFile.md
    ```
    Alternatively, use the CodeStyle -cs option :
    ```
    md2all -cs light yourMarkdownFile.md
    ```
* **a DUAL Theme : Dark for HTML AND Light for PDF printing**: This code Highlighting theme is easily customisable via the config files of the Dark and the Light Themes :
  
  Usage: the following commands export the **Dark Theme to HTML *AND* the Light Theme to PDF**. **AUTOMATIC ! Magic ! :sparkles: :star: :star: :star: :star: :star:**
    ```
    md2all -dual yourMarkdownFile.md
    ```
    Alternatively, use the CodeStyle -cs option :
    ```
    md2all -cs dual yourMarkdownFile.md
    ```

## Images

### Nice image boxing , or not! :smile:

**By default**, md2all **automatically adds nice borders** to your images.

You can change this behavior this way (compatible with Matplotlib, PlantUML and Graphviz rendered images):
* **No borders at all for ANY Image, *or* Same Custom Style for Every Image**: Modify the **.img property** in the default page css (lesson.css)
* **Hide Borders for a specific Image**: Add **{.noimgbox}** class to a specific Image in you .md file, to hide default borders just for a specific Image:
```
![My caption](theImage.png){.noimgbox}
```
* **Your Own Style :+1: for All Images**: 
  * Add **{.imgbox}** class to a specific Image in your .md file,
  * **AND** modify the **.imgbox property** in the default page css (lesson.css):
```
![my caption](theImage.png){.imgbox}
```

### Resizing

* Image width can be set as ```![my caption](theImage.png){width="60%"}``` (percentages only)
* Image width and height can be set as ```![my caption](theImage.png){width="60%" height="40%"}``` (percentages only)
* Other possible Syntax : ```![my caption](theImage.png){style="width:60px; height:40px;"}``` (Here: every css unit allowed: px, em, % etc..)

>Note: you can add ANY additionnal class to image
  <!-- <img src="divsTexteFictif.png" alt="image"  />{.imgbox} -->
  <!-- ![](divsTexteFictif.png){.imgbox style="width:60px; height:40px;"} -->
  <!-- ![](divsTexteFictif.png){.imgbox width="60%" height="40%"} -->

### Floating

- Image float to left and text fill the right : ```![my caption](theImage.png){.floatleft}```
- Image float to right and text fill the left : ```![my caption](theImage.png){.floatright}```
- Image is a block in the center : ```![my caption](theImage.png){.center}``` (by default)

- Image float to left with caption under and text fill the right :

```
![my caption](theImage.png){.floatleft}
```

- Image float to right with caption under and text fill the left :

```
![my caption](theImage.png){.floatright}
```
- Image is a block in the center with caption under : ```![The caption](theImage.png)```

### Clickable Images

- Clickable Image :

```
[![my caption](theImage.png)](http://www.somewhere.cool)
```

- Clickable Image with floats (floatleft or floatright)

```
[![my caption](theImage.png)](http://www.somewhere.cool){.floatleft}
```

### Grouping Images Horizontally

- Two Non Clickable Images, Grouped Horizontally adding "group1" class, (with other NON compulsory other classes)

```
![image 1](img/bateau.jpg){.group1 .classe1}

![image 2](img/bateau.jpg){.group1 .classe2}
```

- Three Clickable Images, Grouped Horizontally adding "group2" class, (with other NON compulsory other classes)

```
[![image 1, avec custom width](img/bateau.jpg)](https://somewhere.cool){style="width:60%; color:red;" monAttrib="Hey" .group2 .maClasse1}

[![image 2, avec custom width](img/bateau.jpg)](https://somewhere.cool){width=20% .group2 .maClasse1 .maClasse2}

[![image 3, avec custom width](img/bateau.jpg)](https://somewhere.cool){width=40% .group2 .maClasse3}
```

- **Syntax** : to group images, just add some "groupX" class (the same one), where X is some integer number, to the EACH image you want in the same horizontal group. Note that, the "groupX" classes have to be defined in ascending order.

- the **Computed width** is the automatically computed percentage, corresponding to $1/n$ of the global width, where $n$ is the number of total images, grouped horizontally. For example:  
  - If you have 2 images, the computed width is 50% of the total width
  - If you have 3 images, the computed width is 33.3% of the total width

- Default & Custom Percentage of an Image in a Horizontal Grouping:
  - By default, each image of a grouping has a relative 100% width **of the computed width** (so it takes all the width it is given for its column)
  - you can customize the size of each image in a grouping, with a width of p% of the computed width. Example: if p% = 50%, then this image will only spread half of the computed column width

Additional Examples of syntax can be found in the *examples/imgGrouping* folder

## LaTeX, Mathematical Formulas:
Use the [standard Latex syntax](https://en.wikibooks.org/wiki/LaTeX/Mathematics) : \$math expression here\$ or $$math$$ if you want a center block formula
### Offline: with LaTeX packages installed locally in your machine
Use ***-off*** or ***-offline*** or ***--offline*** or ***-loc*** or ***-local*** or ***--local*** option to **force offline (/local) export mode**. Example:
```
  md2all -off myMardownFile.md
```

### web : via webtex servers (online), NO installation of LaTeX packages needed
Use ***-web*** or ***--web***  option to force offline (/local) export mode. Example:
  ```
  md2all -web myMardownFile.md
  ```
>Note that web rendered LaTeX pictures (SVGs) will have the default images boxes borders. To solve this, Customize your css or use offline version.

## Matplotlib
All you need to do is to type your Matplotlib code in your md file as follows: 

```
    ```{.pyplot} 
    (Your Matplotlib code comes here)
    ```
```
> Note that you can add any (your custom) additional class or attribute inside this code block. For example caption="This is my figure"

```
    ```{.pyplot .myNiceClass myNiceAttribute="myValue"} 
    (Your Matplotlib code comes here)
    ```
```

Example:
```
    ```{.pyplot .noimgbox} 
    import matplotlib.pyplot as plt

    plt.figure()
    plt.plot([0,1,2,3,4], [1,2,3,4,5])
    plt.title('This is an example figure')
    ```
```

## Graphviz
All you need to do is to type your *Graphviz code* in your .md file as follows: 

```
    ```{.graphviz} 
    (Your Graphviz code comes here)
    ```
```
> Note that **you can add any (your custom) additional class or attribute** inside this code block. For example caption="This is my figure"

```
    ```{.graphviz .myNiceClass myNiceAttribute="myValue"} 
    (Your Graphviz code comes here)
    ```
```

>Note that Graphviz default behavior is that it generates a random (looong) file name and creates it in a graph-images folder especially creates on the fly. The file name is completely meaningless. You can modify this default behavior by setting a ***name attribute*** inside the code block with the syntax : ***name="myNicePicture.uml"***

Example:
```
    ```{.graphviz .center .imgbox caption="This was generated using the graphviz.py filter." name="nicePicture.svg"} 
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
```

## PlantUML
All you need to do is to type your *PlantUML code* in your .md file as follows: 

```
    ```{.plantuml} 
    (Your PlantUML code comes here)
    ```
```
> Note that **you can add any (your custom) additional class or attribute** inside this code block. For example caption="This is my figure"

```
    ```{.plantuml .myNiceClass myNiceAttribute="myValue"} 
    (Your PlantUML code comes here)
    ```
```

>Note that PlantUML default behavior is that it generates a random (looong) file name and creates it in a plantuml-images folder especially creates on the fly. The file name is completely meaningless. You can modify this default behavior by setting a ***name attribute*** inside the code block with the syntax : ***name="myNicePicture.uml"***

Example:
```
    ```{.plantuml .center caption="This is my pict!" name="myNiceFile.uml"} 
        @startuml
        actor client
        node app
        database db

        db -> app
        app -> client
        @enduml
    ```
```

## Force page breaks (before or after), and newpage class

You can use the previous tip to force page breaks. At the end of the default CSS file you can find the **@media print** section.

In this section you can set values for **widows** and **orphans** and choose if you want to avoid a page break after the titles.

But you can also use the classes **.pagebreakbefore**, which is equivalent to **.newpage** (which I find more intuitive) and **.pagebreakafter** in your Markdown file to force a page break everywhere you want. Just add {.pagebreakbefore} or {.newpage} after a title, like this :

```
# Wonderful title{.pagebreakbefore}
```

or

```
# Wonderful title{.newpage}
```

You can also assign these 2 classes to any piece of text using the previous tip.

## Multiple columns

Insert your columns in a block :

```
::: cols

:::
```

### 2 columns

```
::: cols

::: col12
First column
:::

::: col22
Second column
:::

:::
```

### 3 columns

```
::: cols

::: col13
First column
:::

::: col23
Second column
:::

::: col33
Third column
:::

:::
```

## Warning block

::: warning  
You can add a warning block by using this syntax.  
:::

## Blank line

Insert blank lines in Markdown is not always easy. You can insert a blank line between Line 1 and Line 2 like this :

Line 1

\

Line 2

## Your own style :+1: !

A Pandoc Markdown extension is very powerful. You can assign a **class name** to a piece of text and **decorate** it as you want in the **CSS file**.

If you write in your Markdown file :
bla bla bla **[your important text here]{.inlinewarning}** bla bla bla.

***your important text here*** becomes a span with the class name **inlinewarning**, so you can style this piece of text in the CSS file.

In CSS file :
```css
.inlinewarning {
background-color: yellow;
text-decoration: underline;
}
```

# Fonts examples

You can find fonts used in the examples in the [Fonts directory](https://github.com/Luk313/md2all/tree/master/fonts).

# Pandoc Markdown extensions

You can edit your text using the [standard Markdown syntax](http://commonmark.org/help/).
But Pandoc includes a lot of extensions that are very useful like [GFM - GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown). So you can easily write : 
* code blocks, 
* task lists, 
* tables, 
* emojis cf reference [emojis Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet/). Example: In your .md file, inserting ...
  * the code ```:smiley:``` renders :smiley: 
  * the ```:sparkles:``` renders :sparkles:
  * etc..

The example file [proportionnalite.md](https://raw.githubusercontent.com/ValeryBruniaux/md2all/master/examples/proportionnalite.md) shows you how to use them.
