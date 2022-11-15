# Generated by Django 4.1.1 on 2022-11-15 12:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rate',
            name='liked',
        ),
        migrations.AddField(
            model_name='score',
            name='name',
            field=models.CharField(default='newScore', max_length=100),
        ),
        migrations.AlterField(
            model_name='rate',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product'),
        ),
        migrations.AlterField(
            model_name='rate',
            name='scores',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.score'),
        ),
        migrations.AlterField(
            model_name='rate',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
