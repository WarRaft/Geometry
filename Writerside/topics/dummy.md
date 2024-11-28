# Дамми

Так как создатели игры те ещё рукожопы и не завезли функционала для выполнения некотрых, особо важныъ операций, то
сообществом был разработан действенный костыль - создать специально обцченного юнита и с помощью него делать всякое.

Такой юнит был прозван *dummy*, что в переводе означает болванка, которую мы и будем применять в качестве снарядов на
чистожассе.

> В современных лаунчерах наподобие [UjAPI](https://unryzec.github.io/UjAPI) есть прямые методы для создания и
> манипулирования эффектами, но мы не ищем лёгких путей.

По неведомому стечению обстоятельств в сообществе принято для каждого снаряда создавать свой тип юнита. Мы не будем
заниматься таким непотребством, а просто возьмём модельку из
этой [статьи](https://www.hiveworkshop.com/threads/alternative-for-dummy-mdx-for-controling-projectiles.274702) и будем
крепить на неё эффекты.

Модель имеет точку крепления `head` и кость `bone_head` которую можно использовать для поворота на произвольный угол.


<resource src="dumy.mdl"/>

```
Version {
    FormatVersion 800,
}
Model "Name" {
    BlendTime 150,
}
Sequences 1 {
    Anim "Stand" {
        Interval { 0, 33 },
    }
}
Bone "Bone_Head" {
    ObjectId 0,
    GeosetId Multiple,
    GeosetAnimId None,
}
Bone "Bone_Chest_straight" {
    ObjectId 1,
    Parent 0,
    GeosetId Multiple,
    GeosetAnimId None,
    Rotation 1 {
        DontInterp,
        0: { 0, 0, 0, 1 },
    }
}
Bone "Bone_Chest_90screw" {
    ObjectId 2,
    Parent 0,
    GeosetId Multiple,
    GeosetAnimId None,
    Rotation 1 {
        DontInterp,
        0: { 0.707107, 0, 0, 0.707107 },
    }
}
Bone "Bone_Chest_90up" {
    ObjectId 3,
    Parent 0,
    GeosetId Multiple,
    GeosetAnimId None,
    Rotation 1 {
        DontInterp,
        0: { 0, 0, 0.707107, 0.707107 },
    }
}
Bone "Bone_Chest_90right" {
    ObjectId 4,
    Parent 0,
    GeosetId Multiple,
    GeosetAnimId None,
    Rotation 1 {
        DontInterp,
        0: { 0, 0.707107, 0, 0.707107 },
    }
}
Attachment "Overhead Ref" {
    ObjectId 5,
    Parent 2,
    AttachmentID 0,
}
Attachment "Head Ref" {
    ObjectId 6,
    Parent 0,
    AttachmentID 1,
    Rotation 1 {
        DontInterp,
        0: { 0, 0, 0, 1 },
    }
}
Attachment "Chest Ref" {
    ObjectId 7,
    Parent 3,
    AttachmentID 2,
}
Attachment "Origin Ref" {
    ObjectId 8,
    Parent 4,
    AttachmentID 3,
}
PivotPoints 9 {
    { 0, 0, 0 },
    { 0, 0, 0 },
    { 0, 0, 0 },
    { 0, 0, 0 },
    { 0, 0, 0 },
    { 0, 0, 0 },
    { 0, 0, 0 },
    { 0, 0, 0 },
    { 0, 0, 0 },
}
```

