
# Set to `True` to enable debugging options.
DEBUG = True


def build_course(obj_dict):
  from NotBionic.models import Course

  course = Course()

  fields = [
              "start_times", "end_times", "semester",
              "description", "reg_id", "division",
              "instructor", "days", "title", "college",
              "seminar", "course_num",
              "distribution", "description", "location",
              "department", "course_cap", "department_num",
            ]


  for field in fields:
    setattr(course, field, obj_dict[field])

  course.save()


def construct_courses_from_CSV(filename):
  from unicode_csv import UnicodeReader

  with open(filename) as f:
    reader = UnicodeReader(f)
    headers = reader.next()

    if DEBUG:
      iteration = 0

    for row in reader:
      obj_dict = {key:val for key, val in zip(headers, row)}
      build_course(obj_dict)

      if DEBUG:
        iteration+=1
        print iteration
        if iteration==50: break




if __name__=="__main__":

  # Set the PATH so that the Django settings may be used.
  import os, sys
  project = "NotBionic"
  full_path = os.path.dirname(os.path.realpath(__file__))+"/"
  django_path = full_path[:full_path.rfind("/{}/".format(project))]
  if django_path not in sys.path:
    sys.path = [django_path] + sys.path
    os.environ['DJANGO_SETTINGS_MODULE'] = '{}.settings'.format(project)

  construct_courses_from_CSV("NotBionic/data/trico_catalog.csv")
