# Generated by Django 2.2.3 on 2020-04-04 00:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0034_auto_20200402_0301'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='priority',
            field=models.IntegerField(default=100),
        ),
    ]
