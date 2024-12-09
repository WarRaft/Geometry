# Построение для трёх точек

```.``` {id=canvas-cartesian-bezier3}

Построение выполняется на основе [линейной интерполяции](cartesian-segment-lerp.md), которую мы уже применяли
для [отрезков](cartesian-segment.md). В частности на коэффициенте $ t $, который находится в диапазоне $ [0,1] $.

Возьмём три произвольные точки $P_0$, $P_1$,$P_2$, и соединим
их [направленными отрезками](cartesian-segment.md#directed) $ \overline{P_0P_1} $
и $ \overline{P_1P_2} $.

От начала каждого отрезка основываясь на коэффициенте $ t $ отложим точки $ Q_0 $ и $ Q_1 $ соответственно:

$$
\begin{cases}
Q_{0x} = (1-t) \cdot P_{0x} + t \cdot P_{1x} \\
Q_{0y} = (1-t) \cdot P_{0y} + t \cdot P_{1y}
\end{cases}
$$

$$
\begin{cases}
Q_{1x} = (1-t) \cdot P_{1x} + t \cdot P_{2x} \\
Q_{1y} = (1-t) \cdot P_{1y} + t \cdot P_{2y}
\end{cases}
$$

Объединим эти точки в направленный отрезок $ \overline{Q_0Q_1} $ и таким же образом отложим на нём точку $ R $:

$$
\begin{cases}
R_{x} = (1-t) \cdot Q_{0x} + t \cdot Q_{1x} \\
R_{y} = (1-t) \cdot Q_{0y} + t \cdot Q_{1y}
\end{cases}
$$

Таким образом, в зависимости от параметра $ t $ точка $ R $ опишет дугу с начальной точкой $ P_0 $ и конечной $ P_2 $.

## Формула {id=formula}

Чтоб не считать промежуточные точки и сократить количество операций, выведем конечную формулу для нахождения координат
точки $ R $ в зависимости от параметра $ t $.

Как вы заметили выше, формулы для осей практически одинаковы и отличаются
только именем оси. Посему для удобства записи мы посчитаем только для оси $ X $, а уже конечную формулу запишем для
каждой координаты.

Выпишем все необходимые нам координаты точек:

$$
\begin{cases}
Q_0 = (1-t) \cdot P_0 + t \cdot P_1 \\
Q_1 = (1-t) \cdot P_1 + t \cdot P_2 \\
R = (1-t) \cdot Q_0 + t \cdot Q_1
\end{cases}
$$

Раскроем скобки:

$$
\begin{cases}
Q_0 = P_0 - t \cdot P_0 + t \cdot P_1 \\
Q_1 = P_1 - t \cdot P_1 + t \cdot P_2 \\
R = Q_0 - t \cdot Q_0 + t \cdot Q_1
\end{cases}
$$

Выразим $ R $ как сумму слагаемых:

$$
R = A + B + C
\begin{cases}
A = Q_0 \\
B = - t \cdot Q_0 \\
C = t \cdot Q_1
\end{cases}
$$

Подставим значения:

$$
R = A + B + C
\begin{cases}
A = P_0 - t \cdot P_0 + t \cdot P_1 \\
B = -t \cdot (P_0 - t \cdot P_0 + t \cdot P_1) \\
C = t \cdot (P_1 - t \cdot P_1 + t \cdot P_2)
\end{cases}
$$

Раскроем скобки:

$$
R = A + B + C
\begin{cases}
A = P_0 - t \cdot P_0 + t \cdot P_1 \\
B = -t \cdot P_0 + t^2 \cdot P_0 - t^2 \cdot P_1 \\
C = t \cdot P_1 - t^2 \cdot P_1 + t^2 \cdot P_2
\end{cases}
$$

Подставим слагаемые и заодно отсортируем координаты:

$$
R = P_0 - t \cdot P_0 -t \cdot P_0 + t^2 \cdot P_0 + t \cdot P_1 - t^2 \cdot P_1 + t \cdot P_1 - t^2 \cdot P_1 + t^2 \cdot P_2
$$

Выразим $R$ как сумму слагаемых:

$$
R = A + B + C
\begin{cases}
A = P_0 - 2 \cdot t \cdot P_0 + t^2 \cdot P_0 \\
B = 2 \cdot t \cdot P_1 - 2 \cdot t^2 \cdot P_1 \\
C = t^2 \cdot P_2
\end{cases}
$$

Вынесем общие множители за скобку:

$$
R = A + B + C
\begin{cases}
A = (1 - 2 \cdot t + t^2) \cdot P_0 \\
B = (2 \cdot t - 2 \cdot t^2) \cdot P_1 \\
C = t^2 \cdot P_2
\end{cases}
$$

Как вы заметили, в случае $A$ у нас получился квадрат разности, а в случае $ B $ можно вынести за скобку $2 \cdot t$.
Сделаем это:

$$
R = A + B + C
\begin{cases}
A = (1 - t)^2 \cdot P_0 \\
B = 2 \cdot t \cdot (1 - t) \cdot P_1 \\
C = t^2 \cdot P_2
\end{cases}
$$

Вот мы и получили конечную формулу. Опустим знак умножения для пущей красоты:

$$
\begin{cases}
R_{x} = (1 - t)^2  P_{0x} + 2  t  (1 - t)  P_{1x} + t^2  P_{2x} \\
R_{y} = (1 - t)^2  P_{0y} + 2  t  (1 - t)  P_{1y} + t^2  P_{2y}
\end{cases}
$$


