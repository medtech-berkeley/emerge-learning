# Generated by Django 2.1.5 on 2019-04-03 23:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0023_auto_20190211_2335'),
    ]

    operations = [
        migrations.CreateModel(
            name='Badge',
            fields=[
                ('name', models.CharField(max_length=64, primary_key=True, serialize=False)),
                ('description', models.TextField()),
                ('image', models.ImageField(upload_to='badges')),
                ('students', models.ManyToManyField(related_name='badges', to='quiz.Student')),
            ],
        ),
    ]
