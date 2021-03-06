# Generated by Django 2.1.3 on 2019-02-05 04:35

import datetime
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0013_auto_20190107_0432'),
    ]

    operations = [
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('start', models.DateTimeField()),
                ('end', models.DateTimeField()),
                ('is_challenge', models.BooleanField()),
                ('image', models.ImageField(default='default.jpg', upload_to='quiz_images')),
                ('max_time', models.DurationField(default=datetime.timedelta(0, 600))),
                ('difficulty', models.CharField(choices=[('Novice', 'Novice'), ('Intermediate', 'Intermediate'), ('Advanced', 'Advanced')], default='Novice', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='QuizUserData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_started', models.DateTimeField(default=django.utils.timezone.now)),
                ('time_completed', models.DateTimeField(blank=True, null=True)),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quiz_data', to='quiz.Quiz')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quiz_data', to='quiz.Student')),
            ],
        ),
        migrations.RemoveField(
            model_name='category',
            name='tags',
        ),
        migrations.AlterUniqueTogether(
            name='categoryuserdata',
            unique_together=set(),
        ),
        migrations.RemoveField(
            model_name='categoryuserdata',
            name='category',
        ),
        migrations.RemoveField(
            model_name='categoryuserdata',
            name='student',
        ),
        migrations.RemoveField(
            model_name='question',
            name='category',
        ),
        migrations.AddField(
            model_name='question',
            name='tags',
            field=models.ManyToManyField(blank=True, related_name='categories', to='quiz.Tag'),
        ),
        migrations.DeleteModel(
            name='Category',
        ),
        migrations.DeleteModel(
            name='CategoryUserData',
        ),
        migrations.AddField(
            model_name='question',
            name='quiz',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='quiz.Quiz'),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name='quizuserdata',
            unique_together={('quiz', 'student')},
        ),
    ]
