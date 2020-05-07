# Code

\begin{lightCode}{HTML}
  \begin{itemize}
    \item First.
  \end{itemize}
\end{lightCode}

## TEST{.fragile}

```{.python .numberLines startFrom="5"}
for i in range(100):
    if i%2==0:
        print("Pair!")
while i<10:
    i += 1
def maFonction(x):
    print("Hello",x)
```

# HTML CODE

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

# Bullet List

## Bullet List, NON incrémental

* Eat Oranges[^1]
* Drink Coffee
* Drink Water

[^1]: Footnote One


## Bullet List NON ordonnée, incrementale

> * Eat Oranges
> * Drink Coffee
> * Drink Water

C'est moi\thanks{Salut mon gars}

# Listes ordonnées

## Liste Ordonnée, NON incrementale

1. Fraises
2. Framboises
3. Kiwis

## Liste Ordonnée, Incrémentale

> 1. Fraises
> 2. Framboises
> 3. Kiwis

C'est moi\thanks{Salut mon gars}

# LaTeX Maths with \$ ... \$

\alert{alert part with \emph{emphasis}}.

## Math Formula

$\sqrt 2 \approx 1.414..$

# Code Source

## Python Code

```{.python .numberLines startFrom="5"}
for i in range(100):
    if i%2==0:
        print("Pair!")

while i<10:
    i += 1

def maFonction(x):
    print("Hello",x)
```

# Images

![Image 1](img/bateau.jpg)

# Images Resizées

![Image 1](img/bateau.jpg){width=80%}

# Beamer Blocs

\begin{block}{Normal Bloc}
{
\begin{itemize}
        \item item 1
        \item item 2
\end{itemize}
}
\end{block}

\begin{exampleblock}{Example Bloc}
Simmons Dormitory is composed of brick.
\end{exampleblock}

\begin{alertblock}{Alert Block}
Simmons Hall $\not=$ Simmons Dormitory.
\end{alertblock}

# Theorem and Proof (Simple)

\begin{theorem}
There is no largest prime number
\end{theorem}

\begin{proof}
\begin{itemize}
\item Suppose $p$ were the largest prime\pause
\item Let $q$ be ... first $p$ numbers\pause
\item Then $q+1$ is not divisible ...\pause
\item Thus $q+1$ is a prime ... $p$.\pause
\end{itemize}
\end{proof}

# Theorem & Proof (Medium)

\begin{theorem}There is no largest prime number.
\end{theorem}

\begin{proof}
\begin{enumerate}
\item<1-| alert@1> Suppose $p$ were the largest prime number.
\item<2-> Let $q$ be the product of the first $p$ numbers.
\item<3-> Then $q+1$ is not divisible by any of them.
\item<1-> But $q + 1$ is greater than $1$, thus divisible by some primenumber not in the first $p$ numbers.\qedhere
\end{enumerate}
\end{proof}

# Emojis

$\ddot\smile$

Vertical Aligned AND ZOOMED Emoticons:  
this Line :minidisc:{zoom=1.6; vAlign} :minidisc:{zoom=2; vAlign} :minidisc:{zoom=3; vAlign} :minidisc:{zoom=5; vAlign} :minidisc:{zoom=7; vAlign} :heart:{zoom=3; vAlign} :bulb:{zoom=5; vAlign} is vAligned

# Itemize (Simple)

\begin{itemize}
\item
Use \texttt{itemize} a lot--with \pause
\item
Use very short sentences or short phrases.
\end{itemize}

# Itemize (Medium)

\begin{itemize}[<+-| alert@+>]
\item Apple
\item Peach
\item Plum
\item Orange
\end{itemize}

# Uncover Equations

\begin{align*}
A &= \uncover<2->{B}\\
\uncover<2->{&=C\\}
\uncover<3->{&=D\\}
\end{align*}

