# Generated by Django 2.0.1 on 2018-06-21 05:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('text', models.CharField(max_length=64, primary_key=True, serialize=False)),
            ],
        ),
        migrations.AddField(
            model_name='category',
            name='tags',
            field=models.ManyToManyField(related_name='categories', to='quiz.Tag'),
        ),
    ]