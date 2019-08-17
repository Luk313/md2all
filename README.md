# What is md2all ?
**md2all** is a command line OpenSource tool which can **convert Markdown files to HTML and PDF** with predefined CSS styles, and further JS treatment.

# What to do with md2all ?

* **Edit your Markdown** file for beautiful exports in HTML and PDF. Both HTML and PDF files should look pretty the same, so you can **put the HTML file on the web** and/or **print the PDF file** for your students.
* **LaTeX Formulas**:
The purpose is to replace **LaTeX** to **produce standard documents** like lessons, articles, etc.
LaTeX is a good tool but styling markdown with CSS is easier and more flexible than old LaTeX syntax.
* **Style the HTML and PDF export files in CSS and JS**, via media print for PDF export, edit contents with markdown and you can generate beautiful documents in HTML and PDF.
* **Beautiful Code Highlightling**: via **[Prism.js](https://prismjs.com/)**. This includes:
  * **Automatic LineNumbering**: Natively included in md2all. All you need is to type your code in your md file as follows: \`\`\`{.YourLanguage .numberLines} *(Your code comes here)* \`\`\`, or if you nedd more precision: \`\`\`{.YourLanguage .numberLines startFrom="4"} *(Your code comes here)* \`\`\`
  * **A Beautiful Custom Code Dark Theme** named ***Massilia Theme***, inspired by Prism.js' okaidia.css dark theme. This code Highlighting theme is easily customisable in two files: a Pandoc exported and customised theme file, named ***massilia.theme***, and a ***massilia.css*** file.
  * **Automatic Code Language Detection AND Labelisation**, both in HTML and PDF exports. Nothing to do here... **AUTOMATIC ! :+1:** 
* [**Matplotlib**](https://matplotlib.org): Natively include Matplotlib rendered images in your HTML and PDF exports, in **Python language** with **Matplotplib's pyplot syntax**. All you need is to type your Matplotlib code in your md file as follows: \`\`\`{.pyplot } *(Matplotlib code comes here)* \`\`\`. For more info, cf:
  * [MatplotLib Gallery](https://matplotlib.org/gallery/index.html)
  * [Matplotlib Official Site](https://matplotlib.org/) for more info.
  * [A Matplotlib Tutorial for beginners, by Nicolas P. Rougier](https://github.com/rougier/matplotlib-tutorial)
* [**Graphviz**](https://www.graphviz.org): Natively include Graphviz rendered images in your HTML and PDF exports, with ***.dot language*** syntax. All you need is to type your Graphviz code in your md file as follows: \`\`\`{.graph } *(Graphviz code comes here)* \`\`\`. For more info, cf:
  * [Graphviz Gallery](https://www.graphviz.org/gallery/)
  * [Graphviz Documentation](https://www.graphviz.org/documentation/)
* [**PlantUML**](http://plantuml.com): Natively include PlantUML Diagrams rendered as SVGs in your HTML and PDF exports. All you need to do is type your ***PlantUML Language*** code in your md file as follows: \`\`\`{.plantuml} *(PlantUML code comes here)* \`\`\`. For more info, cf:
  * [PlantUML Official Site](http://plantuml.com)
  * [Just Some Diagrams and Example Gallery](http://plantuml.com/fr/sequence-diagram)
* Easy PDF page layout with froce page breaks (*before* or *after*)

# What do I need to install ?

**md2all** mainly uses 2 external tools you **must** install at first, via your preferred package manager:

 * [pandoc](https://pandoc.org/) for HTML export
 * [wkhtmltopdf](https://wkhtmltopdf.org/) for PDF export. ⚠️ if you want footers in PDF you need the QT-patched version in Arch Linux !

Optionnally, If you wish to use the following additionnal fonctionnalities, You **can** install these tools via your preferred package manager:

* **LaTeX :**
If you want to use LaTeX equations, you can choose alternatively one (or both) of the following:
  * __online :__ do NOT install any local LaTeX distribution (by default), and use **internet access** to reach the transform application [codecogs](http://latex.codecogs.com/svg.latex) to convert LaTeX formulas in SVG.
  * or, alternatively, __offline :__ install your preferred local LaTeX distribution: **md2all** will automatically export LaTeX formulas of your md file in [MathJax](https://www.mathjax.org) format in the HTML export file, and hence PDF. Configuration: Just swap commented lines in /usr/bin/md2all corresponding to the pandoc part of the file.
* **Maplotlib**: You must install **python** (>=3.xx advised), the **python-matplotlib** package, and the **pandoc-pyplot** package.
* **Graphviz**: You must install the **graphviz** package, of your preferred Linux distribution.
* **PlantUML**: You must install the **plantuml** package, and the **pandoc-plantuml-filter** package, of your preferred Linux distribution.

# Usage of md2all :

## **md2all** requires 1, 2 or 3 arguments.

- **Usage with 1 argument** : *md2all myMarkdownDile.md* exports the md file, both in html and pdf, in the same folder.

	**Example** : *md2all examples/proportionnalite.md*

- **Usage with 2 arguments** : md2all cssFile.css markdownFile.md
	1) Css file to apply
	2) Markdown file to convert

- **Usage with 3 arguments** : md2all templateFile.template cssFile.css markdownFile.md
	1) Template file to apply
	2) Css file to apply
	3) Markdown file to convert

	**Example** : *md2all templates/lesson.template css/lesson.css examples/proportionnalite.md*

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

## Pandoc Markdown extensions

You can edit your text using the [standard Markdown syntax](http://commonmark.org/help/).
But Pandoc includes a lot of extensions that are very useful like [GFM - GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown). So you can easily write : code blocks, task lists, tables, [emojis](https://www.webpagefx.com/tools/emoji-cheat-sheet/) :smiley:, strikethrough...

The example file [proportionnalite.md](https://raw.githubusercontent.com/ValeryBruniaux/md2all/master/examples/proportionnalite.md) shows you how to use them.

## Images floating

- Image float to left and text fill the right : ```![](theImage.png){.floatleft}```
- Image float to right and text fill the left : ```![](theImage.png){.floatright}```
- Image is a block in the center : ```![](theImage.png){.center}```

If you want a caption for this image you need to wrap the content in a span like this :

- Image float to left with caption under and text fill the right :

```
[![](theImage.png)  <= insert 2 blank spaces at the end of line to break the flow!!!
The caption !]{.floatleft}
```

- Image float to right with caption under and text fill the left :

```
[![](theImage.png)  <= insert 2 blank spaces at the end of line to break the flow!!!
The caption !]{.floatright}
```
- Image is a block in the center with caption under : ```![The caption](theImage.png)```

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

## Mathematical expressions

Use the [standard Latex syntax](https://en.wikibooks.org/wiki/LaTeX/Mathematics) : $math expression here$ or $$math$$ if you want a center block formula

## Blank line

Insert blank lines in Markdown is not always easy. You can insert a blank line between Line 1 and Line 2 like this :

Line 1

\

Line 2

## Your own style :+1: !

One Pandoc Markdown extension is very powerful. You can assign a **class name** to a piece of text and **decorate** it as you want in the **CSS file**.

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

## Force page breaks (before or after)

You can use the previous tip to force page breaks. At the end of the default CSS file you can find the **@media print** section.

In this section you can set values for **widows** and **orphans** and choose if you want to avoid a page break after the titles.

But you can also use the classes **.pagebreakbefore** and **.pagebreakafter** in your Markdown file to force a page break everywhere you want. Just add {.pagebreakbefore} after a title, like this :

```
# Wonderful title{.pagebreakbefore}
```

You can also assign these 2 classes to any piece of text using the previous tip.

# Fonts examples

You can find fonts used in the examples in the [Fonts directory](https://github.com/Luk313/md2all/tree/master/fonts).
