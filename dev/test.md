# Fonctionnalités Markdown Comptatibles Beamer/LaTex

## Texte

### Liens Hypertexte

[Cliquez moi](https://www.google.com)

## Les Listes

### Listes NON Ordonnées, NON incrémentales (apparition directe)

* Premier Item
* Deuxième Item
* Troisième Item

### Listes NON Ordonnées, incrémentales (apparition avec PAUSE)

> * Premier Item
> * Deuxième Item
> * Troisième Item

### Listes NON Ordonnées, incrémentales (apparition avec ```\PAUSE```, version LaTeX)

* Premier Item
\pause
* Deuxième Item
\pause
* Troisième Item

### Liste Ordonnée, NON incrémentale (apparition directe)

1. Fraises
2. Framboises
3. Kiwis

### Liste Ordonnée, Incrémentale (apparition avec PAUSE)

> 1. Fraises
> 2. Framboises
> 3. Kiwis

On aurait pu faire les pauses avec ```\pause```

## Math Formula

* $\sqrt 2 \approx 1.414..$
* $\sum \limits_{i=1}^{n} i = 1 + 2 + 3 + ... + n = \frac{n(n+1)}{2}$

## Images

### Images Normales

![Image 1](img/bateau.jpg)

### Images Resizées

![Image 1](img/bateau.jpg){width=80%}

## Code Source

### Code Source Python dans un 'block' Beamer avec Syntax Highlighting via Pandoc/Markdown

#### PYTHON

```{.python .numberLines startFrom="5"}
for i in range(100):
    if i%2==0:
        print("Pair!")
while i<10:
    i += 1
def maFonction(x):
    print("Hello",x)
```

### Code Source HTML dans un 'block' LaTeX avec Syntax Highlighting via Pandoc/Markdown

#### HTML

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

### Code Source Python dans un 'block' Custom

\begin{lightCode}{Un bloc customisé}
```{.python .numberLines startFrom="5"}
    for i in range(100):
        if i%2==0:
            print("Pair!")
    while i<10:
        i += 1
    def maFonction(x):
        print("Hello",x)
```
\end{lightCode}

```{.python .numberLines startFrom="5"}
for i in range(100):
    if i%2==0:
        print("Pair!")
while i<10:
    i += 1
def maFonction(x):
    print("Hello",x)
```

## Footnotes

### Footnotes

* Eat Oranges[^1]
* Drink Coffee
* Drink Water

[^1]: Footnote One

# Fonctionnalités Beamer/LaTeX plus avancées

## Texte

### Mise en Valeur (en Rouge)

\alert{Texte en Rouge et \emph{italique}}.

### Lien hypertextes URLs

\url{https://youtu.be/VfLe4eCtggc}

## Les Listes Itemize

### Les Listes Itemize Simples

\begin{itemize}
    \item premier élément de liste,
    \item deuxième élément de liste,
    \pause
    \item troisième élément de liste.  
\end{itemize}

## Les Enumerate

### Les Enumerate Simples

\begin{enumerate}
    \item<1-| alert@1> Premier point
    \item<2-| alert@2> Deuxième Point\pause
    \item<3-> Troisième Point\pause
    \item<1-> Dernier point
\end{enumerate}

### Listes Enumerate avec customisation des numéros i, ou a, ou a.)

<!-- Autres styles optionnels possibles : [i]  [a]  [a.)]   -->
\begin{enumerate}[a]
    \item<1-| alert@1> Premier point
    \item<2-| alert@2> Deuxième Point\pause
    \item<3-> Troisième Point\pause
    \item<1-> Dernier point
\end{enumerate}

**Overlay Specifications** in ```\item```  

* ```<-3>``` means from the beginning up to slide 3  
* ```<4->``` means from slide 4 on (up to the end)  
* ```<2-5>``` means from slides 2 to 5  

## Les Listes de Description

### Listes de Description

Ces listes sont utiles par exemple pour des Définitions

 \begin{description}
    \item [Thème de présentation : ] ces thèmes sont en fait...
    \item [Thème de couleur : ] gère tout ce qui est couleur...
    \item [Thème de police : ] s'occupe de tout ce qui est police, gras...
    \item [Thème interne : ] s'occupe de l'apparence des éléments...
    \item [Thème externe : ] gère les en-têtes et pieds de page...
\end{description}

## Les Overlays

### Overlays Simples

\begin{overlayarea}{6cm}{1cm}
   \only<1>{\texttt{première idée overlayarea}}
   \only<2>{\texttt{deuxième idée overlayarea}}
   \only<3>{\texttt{troisième idée}}
   \only<4>{dernière idée}
\end{overlayarea}

## Les Block Beamer

### Les Blocks standards : 'block', 'alertblock' et 'exampleblock'

\begin{block}{Un bloc normal}
  Texte du block \texttt{block}
\end{block}

\begin{alertblock}{Un bloc alerte}
 Texte du block \texttt{alertblock}
\end{alertblock}

\begin{exampleblock}{Un bloc exemple}
 Exemple de block \texttt{exampleblock}
\end{exampleblock}

### Un Block (e.g.) 'lightCode' Customisé

\begin{lightCode}{Un bloc customisé}
  Apparence et Texte du block cutomisé \texttt{lightCode}
\end{lightCode}

## L'Environnement Columns

### Environnement Columns Simple

Ce package est inclus dans Beamer, pas besoin de préciser un ***usepackage*** particulier

\begin{columns}
\begin{column}{0.5\textwidth}
    \begin{block}{HTML}
        \begin{itemize}
            \item premier élément de liste,
            \item deuxième élément de liste,
            \pause
            \item troisième élément de liste.  
        \end{itemize}
    \end{block}
   Texte sous le block
\end{column}
\begin{column}{0.5\textwidth}  %%<--- here
    \begin{center}
        \includegraphics[width=0.5\textwidth]{img/chouette.png}
    \end{center}
\end{column}
\end{columns}

### ATTENTION : '***columns***' NE fonctionne PAS avec le Syntax Highlighting dans un bloc, hérité de Markdown/Pandoc

\begin{columns}
\begin{column}{0.5\textwidth}
    \begin{block}{HTML}
        \begin{itemize}
            \item premier élément de liste,
            \item deuxième élément de liste,
            \item troisième élément de liste.  
        \end{itemize}    
    \end{block}
   Texte sous le Block
\end{column}
\begin{column}{0.5\textwidth}  %%<--- here
        \begin{lightCode}{HTML}
            for i in range(100):
                if i%2==0:
                    print("Pair!")
            while i<10:
                i += 1
            def maFonction(x):
                print("Hello",x)
        \end{lightCode}
\end{column}
\end{columns}

## L'Environnement ***multicols*** (nom de package package ***multicol***)

### MULTICOLS

Cet environnement permet de créer $n$ colonnes, et les remplir automatiquement.

\begin{enumerate}
\begin{multicols}{3}   % 3 est le nombre de colonnes à remplir
    \item{item 1}
    \item{item 2}
    \item{item 3}
    \item{item 4}
    \item{item 5}
    \onslide<2->{
        \item{item 6}
        \item{item 7}
        \item{item 8}
        \item{item 9}
        \item{item 10}
    }
    \onslide<3->{
        \item{item 11}
        \item{item 12}
        \item{item 13}
        \item{item 14}
        \item{item 15}
    }
\end{multicols}
\end{enumerate}

## les Environnements Cadrés

### CACHES

\begin{definition}
    environnement definition
\end{definition}
  
\begin{example}
   environnement example
\end{example}

## l'environnement ***theorem*** de BEAMER

### THM BEAMER

Cet environnement numérote les théorèmes, 

\begin{theorem}
    Il n'existe PAS de plus grand nombre premier
\end{theorem}

\begin{proof}
\begin{itemize}
    \item Supposons que $p$ soit ce plus grand nombre premier\pause
    \item Soit $q$ le ... des $p$ premiers nombres premiers\pause
    \item Alors $q+1$ n'est divisible par ...\pause
    \item Donc $q+1$ est un nombre premier ... $p$.\pause
\end{itemize}
\end{proof}

Optionnally, ```\qedhere``` can be added to customised position of QED symbol

\begin{lemma}[Siclone]
\label{trivia}
Si $a=2$ alors $a^2 = 4$.
\end{lemma}

## l'environnement ***theorem*** de l'***AMSTHM***

### AMSTHM

Ces Environnements sont définis, et sont modifiables, dans le fichier YAML

\begin{thm}
    Il n'existe PAS de plus grand nombre premier
\end{thm}

\begin{prop}
    Il n'existe PAS de plus grand nombre premier
\end{prop}

\begin{pte}
    Il n'existe PAS de plus grand nombre premier
\end{pte}

\begin{pte}
    for i in range(100):
        if i%2==0:
            print("Pair!")
    while i<10:
        i += 1
    def maFonction(x):
        print("Hello",x)
\end{pte}

## Bibliographie

### Bibliogrpahie BEAMER

voir la Référence \cite{maReference} et \cite{autreReference}

\begin{thebibliography}{9}
    \bibitem{maReference}
    Auteur, Prénom, Editeur, Année
    \bibitem{autreReference}
    Autre Référence

\end{thebibliography}

### Bibliographie avec BibTeX


